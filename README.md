# JC News

## Overview

This project is a demonstration of my front-end knowledge for my portfolio. It is a single page website designed with React, and deployed with Netlify. React Bootstrap has been used as a material library.

 Its data is pulled from a backend API I also designed, [link to the repo here](https://github.com/panzerlover/nc-news). All the details of the backend API are included in the readme file.

Please note the styling is rudimentary and has only been applied as neccessary for functionality.

## The Website

[check the hosted website out here](https://joseph-craven-jcnews.netlify.app/)

This website allows the user to view any of the articles in the database, with options for sorting, filtering by topic, and pagination. Users can post comments, vote on comments, and delete comments they have made.

The user for this app has been hardcoded and cannot be changed. However, the app has been tested with different users and has been set up to allow easily installation of user login/logout/validation functionality.

### The Home Page & Navigation

The home page has curated content for users to view, showing previews of a small number of the most popular and newest articles for the user to browse. From the home page, the user can navigate either using the tabs on the navigation bar at the top, or by clicking on the buttons on the home page. 

Clicking on the "See more..." Buttons will navigate the user to the article page, with filters preset to the same settings used to generate the curated articles.

### Filters

The articles page includes filter buttons that allow the user to view and change how the articles are being filtered and sorted. Users can filter by topic, and sort by a variety of criteria, and set the order to ascending or descending. The filtered results are paginated, and allow the user to set how many cards are populated per page.

### Articles

On both the home and articles pages, only previews of the articles are shown to allow the user to pick and choose what they would like to read. To view the full articles, the user can press the links on the article previews to open up a modal with the full details of the articles. This allows them to read the articles and view the comments on these articles without it disrupting the viewing flow; once the article has been read, they can close the modal without their place on the page changing. If the user wishes to view or link to the article as it's own page, a link has been provided on the modal for this purpose. 


### Voting

Once viewing an article, the user can increase or decrease the number of votes on an article. The user can click the "show comments" button to show all the comments for that article. The comments are paginated, and allow the user to set how many comments to view per page. The comments for each article can also be voted on. 

### Commenting

Once the comments have been shown, the "leave comment" button appears, and, once clicked on, allows the user to type a comment and post it with the "post" button. The new comment field validates for length and non-whitespace characters, thus blocking the user from posting an empty comment.

### Deleting Comments

Comments the user has left can also be deleted. Any comments the user has left will have a "Delete" button, which requires several purposeful clicks before the comment is deleted to prevent accidental deletion. Once deleted, the user is given visual feedback that the comment was deleted, and a placeholder card is populated in the comments. This placeholder comment card will be deleted on page refresh, or if a second comment is deleted.

## Running the website locally

To run this website locally, [download, clone, or fork the repo from the Github page](https://github.com/panzerlover/jc-news). If you have a github page, you can click the "fork" button at the top right to create a copy of the repo.


### Creating a Local Copy

On the repo page, click the big green "code" button to view a list of options for creating a local copy. From this dropdown, the repo can be viewed in github desktop, downloaded as a zip, or cloned directly with a https or ssh link. I recommend cloning the repo using the git CLI.

To clone the repo via the command line, first open up a terminal. This requires git to be installed on whatever machine you are using, including VMs such as WSL.

Navigate to the directory you want the copy of the repo to be in with 

```
cd <desiredDirectory>
```

Then clone the repo using the git CLI:

```
git clone https://github.com/panzerlover/jc-news.git
```

Once the repo has been cloned, it can be opened and viewed in whatever IDE you choose. With VSCode the commands are:

```
cd jc-news
code .
```

### Node

This app was built using Nodejs v18.0.0 and functinality cannot be guaranteed with lower versions. [node can be downloaded here](https://nodejs.org/en/download/); This includes a version of npm which we can use to install our dependencies.

### Installing The Dependencies

This app uses React, and other dependencies to function correctly. Once the repo has been cloned, make sure you are in the root directory of the repo (we did this in the previous step with `cd jc-news`) and enter the below into the CLI to install dependencies automatically with npm:

```
npm install
```

### Hosting The Website Locally

Once the dependencies have been installed, this repo includes scripts for automatically deploying local versions for testing and debugging purposes. Simply enter the below into your terminal and React will compile and build the site.

```
npm start
```
React will automatically host the site on port 3000, and should open up the page in your computers default web browser. If it doesn't, open up your browser and enter localhost:3000  as a URL to view the site. If you are already using this port react will prompt you to use a different one.

From there, the website can be navigated as you would any other. 

One the site has been hosted locally, React will automatically recompile and redeploy any changes you make to the code. It will also leave helpful tips and warnings in the terminal to highlight any problems with your changes.
