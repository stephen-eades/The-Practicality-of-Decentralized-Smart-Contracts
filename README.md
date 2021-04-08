# The Practicality of Decentralized Smart Contracts
IT8010 Capstone Project - Instructed by Dr. Murat Ozer

Stephen Eades - Eadessn@mail.uc.edu

## Synopsis
For this project I will build a decentralized application (dApp) that can be used to create and deploy customizable smart contracts. The user can access the dApp from any web browser, and will be able to choose a contract template (poll, raffle, or escrow). They can input parameters for the smart contract to implement before being deployed, such as how long the contract should be active for. Once deployed, any other user can use the dApp to view and interact with the smart contract, for example if they wanted to vote in a poll.
To build it, I'll be utilizing several features unique to Ethereum, along with a couple helpful libraries. The EVM (Ethereum Virtual Machine) and Smart Contracts written in Solidity will power the backend and handle the main functionality of the application. Truffle, Ganache, and Web3.js will help with testing and allowing the front end to interact with the the blockchain. The front end interface will be built with React and Drizzle, and will be compatible with Metamask, an Ethereum wallet extension for browsers. 
This application will test how practical current decentralized applications are for being used in basic processes that rely on trust.
I'd like to evaluate the transaction costs that a user may encounter when using dApps, as well as help identify challenges and limitations of current decentralized applications. 

## Research Question
* What are the expected costs for a user creating or interacting with a smart contract?
* What challenges do regular users face when trying to access a decentralized application?
* Are smart contracts a practical solution for handling processes between users, such as voting, escrow, and raffles?

## Problem Statement
Blockchain technology has recently grown in popularity among developers and investors, and many are wondering how the new technology will fit into our current lives. Some projects have begun to show signs of progress and promise. Smart contracts and decentralized applications on the Ethereum Blockchain have been a major point of focus in the newfound industry, and developers have begun to explore what this new technology is capable of. There has yet to be major usage of decentralized applications by the general population however. Many of the current dApps are limited and rigid in their functionality, leaving the user to deal with the smart contract as it was built by the developer. Blockchain technology could help remove the middleman from many situations where it would benefit the end users, and the ability to let the user customize their smart contract could be a way to help grow the adoption of decentralized applications for day-to-day usage. My project will provide insight on how a blockchain-based application can be built as a web application, as well as the possible challenges that might be encountered when attempting to build and use Smart Contracts at various scales of users. Additionally, I hope my project can give future researchers and developers awareness on the benefits and downsides of building a decentralized application. If successful, blockchain technology could revolutionize how we exchange value and how we automate processes that require trust.

I'll be adding more here to expand on the problem statement.... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero. Nunc placerat sapien nisl, iaculis blandit sapien tempor vitae. Donec euismod risus odio, ac maximus dolor sollicitudin id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

## Architecture Engineering
When considering the architecture of this project, I first needed to choose the blockchain that I would build my application on. Out of the contenders, Ethereum was the most mature in both age and ecosystem. Ethereum came out in 2015, and many developers have created tutorials, written books, built tools and created applications that helped me come to the decision of building on Ethereum. 
Solidity is the language used for the Ethereum Virtual Machine (EVM) and will be what I write my smart contracts in. Truffle will be an important tool, as it helps with building, deploying, and testing the application. Another importance piece is having a testnet blockchain to work on before deploying to production. Ganache will come into play there, and provides us some accounts with fake ethereum to cover our transaction costs. The final part will be creating a frontend interface for users to interact with our smart contracts. Truffle happens to have some frameworks, such as Drizzle, that already has React components for the UI. This does a lot of the work for me on the frontend so I can focus on the smart contracts. Finally, Web3.js api will be used to connect the frontend with the Ethereum network, and will help us check if the user has the Metamask wallet extension. Without Metamask, the user won't be able to use their Ethereum to interact with the smart contracts. 

I'll be adding more here to expand on the architecture... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero. Nunc placerat sapien nisl, iaculis blandit sapien tempor vitae. Donec euismod risus odio, ac maximus dolor sollicitudin id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac bibendum ante. Proin sollicitudin ex sit amet purus pretium, ultrices luctus nisi tincidunt. Nulla in efficitur enim.e.

All-in-all, the tools, frameworks, and technologies I'm using are below with their versions. 
* Solidity - 0.5.16
* Web3.js - 1.3.4
* Truffle - 5.1.66
* Ganache - 2.5.4
* Metamask - 9.0.5
* Node - 10.19.0
* npm - 6.14.4

To help illustrate, I drew up the achitecture to provide the common view of a decentralized application. You can see the user interacts with the React frontend and encounters the Web3.js api and check for Metamask. They then are able to interact with the Ethereum network which consists of many nodes, all containing smart contracts, storage options, and the EVM for processing. 

![dapp-architecture-img](assets/img/architecture.PNG)

I'll be adding more here about the specific solidity features I used in my code. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque..

## User Experience
I'll be adding here once the application is completed and I can have users test. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque.

### Lorem ipsum dolor sit amet, consectetur adipiscing elit:
* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque.

* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque.

* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque.

* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque.

I'll be writing here about the interface of the application... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero. Nunc placerat sapien nisl, iaculis blandit sapien tempor vitae. Donec euismod risus odio, ac maximus dolor sollicitudin id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac bibendum ante. Proin sollicitudin ex sit amet purus pretium, ultrices luctus nisi tincidunt. Nulla in efficitur enim.

![dapp-interface-img](assets/img/interface.PNG?raw=true)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. 

Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero. Nunc placerat sapien nisl, iaculis blandit sapien tempor vitae. Donec euismod risus odio, ac maximus dolor sollicitudin id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac bibendum ante. Proin sollicitudin ex sit amet purus pretium, ultrices luctus nisi tincidunt. Nulla in efficitur enim.

## Evaluation Metric
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a.

## Data Insights
Will be compiling data and using Python to create some visualizations of the costs of transactions and creating smart contracts to display. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero. Nunc placerat sapien nisl, iaculis blandit sapien tempor vitae. Donec euismod risus odio, ac maximus dolor sollicitudin id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac bibendum ante. Proin sollicitudin ex sit amet purus pretium, ultrices luctus nisi tincidunt. Nulla in efficitur enim.e.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque..

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero. Nunc placerat sapien nisl, iaculis blandit sapien tempor vitae. Donec euismod risus odio, ac maximus dolor sollicitudin id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac bibendum ante. Proin sollicitudin ex sit amet purus pretium, ultrices luctus nisi tincidunt. Nulla in efficitur enim.

## Analysis 
Will discuss my analsis of the above data insights and other findings I come across. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero.

## Conclusion
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed mauris molestie, elementum tortor id, bibendum neque. Sed pretium sed eros in pellentesque. Curabitur gravida, risus nec interdum dictum, sapien velit volutpat arcu, sit amet iaculis erat justo non arcu. Maecenas egestas enim ex, id suscipit lorem pharetra a. Vivamus aliquam augue dui, ullamcorper semper nisl feugiat et. Quisque blandit nunc eget augue vestibulum bibendum. Praesent nisi arcu, suscipit vitae sapien pharetra, lobortis laoreet libero. Nunc placerat sapien nisl, iaculis blandit sapien tempor vitae. Donec euismod risus odio, ac maximus dolor sollicitudin id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac bibendum ante. Proin sollicitudin ex sit amet purus pretium, ultrices luctus nisi tincidunt. Nulla in efficitur enim.
