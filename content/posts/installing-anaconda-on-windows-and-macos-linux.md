---
layout: blog
title: Installing Anaconda on Windows and macOS/Linux
date: 2023-06-16T10:42:07.621Z
---

> In this tutorial, you will learn how to install Anaconda on Windows, macOS and Linux and why it is best rather than just installing only Python.  
  
There are several versions of Python, majorly Python 2 or 3. While recent projects and libraries were in Python 3, a significant number of legacy projects and libraries were written in Python 2.  
  
![Python 2 or 3 ](https://jeremyikwuje.link/uploads/python-2-or-3.png)
  
**As a data engineer, a lot of times you will be working with projects that require different library versions or different versions of Python.**  
  
In my experience and in many other people’s, it is really difficult to get these versions to play nicely together on one computer.  
  
What's the solution?  
  
## Virtual environments  
  
To solve this problem we use virtual environments managed with libraries such as **Virtualenv**.  
  
![Virtualenv website](https://jeremyikwuje.link/uploads/virtualenv.png) 
  
A virtual environment lets you separate libraries required by different projects, so you can avoid conflicts.  
  
If you are working with data though, Anaconda is the way to go.  
  
## Anaconda  
  
Anaconda is a distribution of libraries and software specifically built for data scientists and engineers. You can easily _install_ , _upgrade_ , or _uninstall_ Python packages and environments.  
  
![A screenshot of Anaconda Website Homepage ](https://jeremyikwuje.link/uploads/ananconda-home-page.png)
  
Installing Python packages and creating a virtual environment is simple with Anaconda, thus you can work on multiple projects conveniently.  
  
You may already have Python installed on your computer, but as a data specialist, it will be beneficial to use Anaconda because:  
  
- You will be needing a lot of data science packages as you progress. Anaconda comes with a bunch of data science packages; you'll be all set to start working with data.  
- It comes with Conda, a package and environment manager that will make your work a thousand times better. By using ```conda` `` to manage your packages and environments you will minimize future issues dealing with the various libraries in your projects.  
  
**A Python package is a bunch of modules, where each module consists of classes and function definitions. After installing a particular package, you can `import` and use the classes and functions defined in that package.**  
  
With Anaconda, the basic few packages you may need are installed by default. But you can also install more packages if you want.  
  
### Downloading Anaconda Distribution  
You will need about 700 MB to download the [Anaconda Distribution](https://www.anaconda.com/). It is fairly large because it comes with most of Python’s data science packages.  
  
**To download, visit the [website](https://www.anaconda.com/) as seen in the screenshot above and click the Download button.**  
  
By default, it downloads the latest version of Anaconda for your computer.  
  
**Once downloaded, go to your downloads (or anywhere you saved the downloaded file) and click the Anaconda installer file to install.**  
  
Included in the Anaconda distribution are the **Anaconda Navigator**, **Conda**, the latest version of **Python**, and over 160 scientific packages and their dependencies.  
  
- The Anaconda Navigator is an easy-to-use user interface that helps open up any installed applications, such as Jupyter Notebook or VS code editor. Don’t worry if you are not familiar with Jupyter Notebook or VS code editor, you will learn more about them as we proceed in the series.  
  
![Anaconda Navigator Home Screen](https://jeremyikwuje.link/uploads/anaconda-navigator-home.png)  
  
- Anaconda also includes **Conda** (we mentioned above), a command-line utility for package and environment management. On Windows just search for **“Anaconda Prompt”**, run as Administrator to execute the `conda` command. Mac/Linux users can use the default Terminal.  
  
You can try running the command below on Anaconda Prompt or Terminal(for Mac/Linux users).  
  
```git  
conda --version  
```  
If you are not yet comfortable typing on a command line interface or Terminal, no fret, it is easy! check out the [command prompt tutorial for Windows](https://www.lynda.com/-tutorials/Windows-command-line-basics/497312/513424-4.html) or [Linux and macOs Command Line Basics](https://www.youtube.com/watch?v=bXIHEIUSXvY).  
  
## Is Anaconda too big? Miniconda  
Miniconda is a smaller version of Anaconda compared to Anaconda and they can both achieve the same thing. The only difference is that it is missing **the preinstalled data science packages.** But you can still any package you want using the command `conda install [package name]` on Anaconda Prompt or Terminal.  
  
Interestingly, it is upgradeable. You can at any time upgrade from Miniconda to Anaconda. Just use the command whenever you want to.  
  
```git  
conda install anaconda  
```  
  
Use Miniconda if you don’t need all the preinstalled packages that come with Anaconda or if you need to conserve bandwidth or storage space on your system.  
  
Congratulations! If you follow the steps above, you have successfully installed Anaconda/Miniconda on your computer.  
  
Have fun!