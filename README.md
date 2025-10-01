# Myxellia Figma take home test

Myxellia Front End Engineer Figma take home assessment test

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories

This project is a technical assessment designed to test the ability to translate a provided Figma design
 into a fully functional web application. The goal is to accurately implement the UI while meeting core requirements such as responsiveness, clean code structure, and deployment.

Candidates are expected to submit a live deployment (Vercel), provide access to the GitHub repository for code review, and share their resume or portfolio. Successful completion of this challenge, with a focus on code quality and attention to design details, will result in feedback and a strong chance of an offer (90% if requirements are met).

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/myxellia-figma](https://github.com/traez/myxellia-figma)
- Live Site URL: [https://myxellia-figma.vercel.app/](https://myxellia-figma.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Typescript
- Nodejs
- Tailwind CSS
- ShadCN  
- @radix-ui  
- class-variance-authority  
- clsx  
- lucide-react  
- tailwind-merge    
- react-icons     
- chart.js     
- react-chartjs-2     

### What I learned

**1 Styling shadcn/ui Dialog Close Button**  
## 

```typescriptreact
<DialogContent className="[&>button]:text-white">
```

**Key Learning:** This CSS selector `[&>button]:text-white` means "apply `text-white` to any direct `<button>` child inside `DialogContent`," which includes the default close X button.

**Why this works:** This technique works across all shadcn/ui components (Sheet, Dialog, Popover, etc.) because they are built on Radix Primitives, which render actual DOM elements under the hood. The `&` represents the parent element (DialogContent), and `>button` targets direct button children.

**Use cases:** Apply this pattern whenever you need to style default buttons or icons within shadcn/ui overlay components without creating custom components.

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Zeeofor Technologies](https://zeeofor.tech)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
