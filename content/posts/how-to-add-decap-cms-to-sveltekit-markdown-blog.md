---
layout: blog
title: How to add Decap CMS to Sveltekit (Markdown Blog)
date: 2023-06-20T16:08:18.282Z
---
How to add Decap CMS to your Sveltekit Markdown Blog

### Introduction

In this article, you will learn how to add Decap CMS (formerly Netlify CMS) to your Sveltekit Markdown Blog hosted on Netlify.

> They are the same steps I followed when adding a CMS for the Monierate  [blog](https://monierate.com/publication)  .

Decap CMS isn’t just for Sveltekit, you can add it to a variety of static site builders like Hugo or Gatsby.

### App Structure

I assume you already have a working Sveltkit Markdown blog. If you don’t, there is a great article written by [**Matija**](https://joyofcode.xyz/sveltekit-markdown-blog) on how to build a SvelteKit Markdown blog.

Let’s get to it.

Decap CMS requires a static `admin` folder at the root of your published site. For Sveltekit, this folder is the `static` folder at the root of your Sveltekit project. So create `admin` folder inside the `static` folder.

![Sveltekit Project Structure](https://jeremyikwuje.link/uploads/sveltekit-project-structure.png)

> Normally `static` folder is where you store static files like images in a Sveltekit project.

Inside the `admin` folder create two files `config.yml` and `index.html`.

The first file, `admin/config.yml` , is the heart of your Decap CMS installation, and a bit more complex. Don’t worry, you will see how this work in the next step.

The second file, `admin/index.html`, is the entry point for the Decap CMS admin interface. This means that users navigate to `yoursite.com/admin/index.html` to access it. Later we will add the Decap CMS JavaScript file inside the index.html that will load up the admin interface.

### Configurations
Inside the `admin/config.yml` file, add the following configuration code:
```yaml
backend:
	name:  git-gateway
	branch:  main  # Branch to update (optional; defaults to master)

# This line should *not* be indented
publish_mode:  editorial_workflow

# These lines should *not* be indented
media_folder:  "static/uploads"  # Media files will be stored in the repo under static/uploads
public_folder:  "/uploads"  # The src attribute for uploaded media will begin with /uploads

collections:
	name:  "blog"  # Used in routes, e.g., /admin/collections/blog
	label:  "Blog"  # Used in the UI
	folder:  "src/posts"  # The path to the folder where the documents are stored
	create:  true  # Allow users to create new documents in this collection
	slug:  "{{slug}}"  # Filename template, e.g., title.md
	fields:  # The fields for each document, usually in front matter
		-  {label:  "Layout",  name:  "layout",  widget:  "hidden",  default:  "blog"}
		-  {label:  "Title",  name:  "title",  widget:  "string"}
		-  {label:  "Description",  name:  "description",  widget:  "string"}
		-  {label:  "Publish Date",  name:  "date",  widget:  "datetime"}
		-  {label:  "Featured Photo",  name:  "featured",  widget:  "image"}
		-  {label:  "Body",  name:  "body",  widget:  "markdown"}
```
What exactly is happening here? Let me explain.

#### backend
Decap CMS requires a backend configuration. Since we're using [Netlify](https://www.netlify.com/) for our hosting and authentication in this tutorial, the backend configuration is fairly straightforward.

The configuration markup I used is for Github repositories:
```yaml
backend:
	name:  git-gateway
	branch:  main  # Branch to update (optional; defaults to master)
```

It specifies your backend protocol and your publication branch. I used `main` as the publication branch, the default is `master` but you can use any. The `git-gatway` acts as a proxy between authenticated users of your blog and your blog repository.

#### editorial_workflow
```yaml
# This line should *not* be indented
publish_mode:  editorial_workflow
```
By default, saving a post in the CMS interface pushes a commit directly to the publication branch specified in `backend`, in our case `main`. However, this is not good for live content publishing. By setting the `publish_mode` to  `editorial_workflow`, the CMS enable the interface to add an interface for drafting, reviewing, and approving posts.

#### Media and Public Folders
Decap CMS allows users to upload images directly within the editor. You need to specify where these images will be stored and accessed. The value of the `media_folder` is the path images will be stored in the repo. The value of the `public_folder` is the source path when accessing the uploaded media.
```yaml
# These lines should *not* be indented
media_folder:  "static/uploads"  # Media files will be stored in the repo under static/uploads
public_folder:  "/uploads"  # The src attribute for uploaded media will begin with /uploads
```
For a Sveltekit project, the `media_folder` value should be `static/uploads` so any image or uploads via the CMS get stored in a folder called `uploads/` inside the `static/` folder.

For the `public_folder`, the value should just be `/uploads`. 

In case you are thinking why the `media_folder` include the `static` but the `public_folder` do not, here is why:

In Sveltekit, image files (e.g logo.png) are **stored** in the  `static` folder, but when specifying the `src` attribute on `<img>` to **show** the logo we omit the `static`.

```html
<img src='logo.png'>
```  
In our CMS configuration, all media files are **stored** in `static/uploads`. If we upload a file called `cat.jpg` it get stored as `static/uploads/cat.jpg`. However, to **show** the image in the published site, we omit the `static`
```html
<img src='uploads/cat.jpg'>
```
Internally, Sveltekit automatically looks for `uploads/cat.jpg` inside the `static` folder relatively to the project root. By specifying `/uploads` as the `public_folder`in our CMS config the images can be located and displayed on the published site.

> `media_folder` specifies where uploaded files are stored in the repo, `public_folder` indicates where they are found in the published site. You don't have to name the media and public folder as `/uploads`, you can choose a name that suite you.


#### Collections
Collections define the structure for the different content types on your static site. In our case, it's a Sveltekit markdown blog.

Blog posts will be stored in `src/posts` relative to the project root, and files saved in a title format, like `what-is-svelte.md`. Each post begins with settings in yaml-formatted front matter, like so:
```yaml
---
layout: blog
title: "What is Svelte"
date: 2023-06-18 11:59:59
featured: "/images/prince.jpg"
---

Svelte is modern frontend framework for building web application with HTML, CSS & JavaScript.
```
Given the above, here is how our collection look like in the config file.
```yaml
collections:
	name:  "blog"  # Used in routes, e.g., /admin/collections/blog
	label:  "Blog"  # Used in the UI
	folder:  "src/posts"  # The path to the folder where the documents are stored
	create:  true  # Allow users to create new documents in this collection
	slug:  "{{slug}}"  # Filename template, e.g., title.md
	fields:  # The fields for each document, usually in front matter
		-  {label:  "Layout",  name:  "layout",  widget:  "hidden",  default:  "blog"}
		-  {label:  "Title",  name:  "title",  widget:  "string"}
		-  {label:  "Description",  name:  "description",  widget:  "string"}
		-  {label:  "Publish Date",  name:  "date",  widget:  "datetime"}
		-  {label:  "Featured Photo",  name:  "featured",  widget:  "image"}
		-  {label:  "Body",  name:  "body",  widget:  "markdown"}
```

You can customized your collections however you want. You can specify a different `folder` where your posts will be stored, add more front matters like categories or tags, it depends.

### Add Netlify CMS Package
In the `static/admin/index.html` add the following code:

```html
<!doctype  html>
<html>
<head>
	<meta  charset="utf-8" />
	<meta  name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta  name="robots" content="noindex" />
	<title>Content Manager</title>
	<script  src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>

<body>
	<!-- Include the script that builds the page and powers Decap CMS -->
	<script  src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```
In the code above there are two scripts. The first script within the `<head>` is the Netlify Identity Widget which handle authentication. And the second script within the `<body>` will load up the CMS from the `unpkg` CDN anytime you visit `yoursite.com/admin/index.html`.

Now visit `yoursite.com/admin/index.html` to load up the CMS.

![Netlify CMS Login](https://jeremyikwuje.link/uploads/netlify-cms.png)

If the CMS load up succesfully as above, then great, you have successfully setup and configure Decap CMS (formally Netlify CMS). All that's left is to enable authentication.

>**If you are running locally, it time you commit your changes to the Github repo where your Sveltekit site is configured with Netlify.**

### Managing Authentication with Netlify Identity
You don't want anyone to just have access to your CMS and start publishing content or deleting old ones. You want only authorised users.

#### Setting up Netlify Identity and Git Gateway
To setup Netlify Identity, you have to enable Identity and Git Gateway services within your site dashboard on Netlify. Identity and Git Gateway services allow you to manage CMS admin users for your site without requiring them to have an account with your Git host or commit access on your repo.

From your site dashboard on Netlify:

1.  Go to  **Settings > Identity**, and select  **Enable Identity service**.
2.  Under  **Registration preferences**, select  **Open** if you on the free plan, or **Invite only** if you on a paid plan. In most cases, you want only invited users to access your CMS, but on the free plan **Invite only** is very limited. Don't worry, you will switch back to **Invite Only** once you have authenticated yourself or someone.
3.  If you are on free plan, allow one-click login with services, GitHub preffered, or check the boxes next to the services you'd like to use, under  **External providers**.
4.  Scroll down to  **Services > Git Gateway**, and click  **Enable Git Gateway**. This authenticates with your Git host and generates an API access token. For now leave the role blank, your can learn more about this if you ever need to, check the  [Netlify Identity documentation](https://www.netlify.com/docs/identity/).

Now, access the CMS by visiting `yoursite.com/admin/index.html` and click on the login button. This will show a dialog, you can signup manually, but I prefer you **Continue with GitHub** if you allowed one-click login services in step 3 above.

![Netlify Identity Login Screen](https://jeremyikwuje.link/uploads/netlify-login-cms.png)

Follow the instructions succesfully, and login to your Decap CMS dashboard.

If you made use of the starter Sveltekit blog for this tutorial, your CMS should display the sample posts as shown below.

Woho! You have succcessfully learn how to add Decap CMS to your Sveltekit Markdown Blog. With the CMS you can create, edit, and delete post direct. No need to manually commit changes locally when managing your blog.