### PlayWrightAutomationProject

This automation framework contains tests which needed for testing of UI functionality


## **Project Setup**

1. Download Node JS version at list 18.17 or higher [v18.18.0 ](https://nodejs.org/en/blog/release/v18.18.0) version.
2. Add Node.js to the PATH Environment Variable
   The Node.js installer usually adds Node.js and npm to your PATH automatically.    
   If for some reason this doesn't happen, or you need to do it manually, follow these steps:

   
 
   2.1 (Windows instruction) Open System Properties: 
   - Press Win + X and select System.
   - Click on Advanced system settings on the left panel.
   - In the System Properties window, click on the Environment Variables button.
   - Edit the PATH Variable:
   - In the Environment Variables window, under System variables, scroll down and find the Path variable.   
   - Select Path and click Edit.

   2.2 Press Win + X, select System.
   - Click on Advanced system settings.
   - Click on Environment Variables.
   - Add a New Environment Variable:
   - In the Environment Variables window, click New under User variables or System variables depending on your scope.
   - Enter the variable name (e.g., MY_GLOBAL_VARIABLE) and its value (e.g., hello).
   - Edit an Existing Environment Variable:
   - Select the variable from the list and click Edit.

   2.3 Add Node.js and npm Paths:
   Click New and add the path to the directory where Node.js is installed. 
   - By default, this is usually: 'C:\Program Files\nodejs\'

   2.4  Verify the Installation
   To verify that Node.js and npm are set up correctly and globally available:
   - Open a New Command Prompt:
   Press Win + R, type cmd, and press Enter.
   - Check Node.js Version:
   Type the following command *node -v* and press Enter

   2.5  Check npm Version:
   - Type the following command *npm -v* and press Enter:

## **Running the tests**
Tests will be run on 2 browsers, chromium, firefox using 2 workers. 
This can be configured in the playwright.config file. 
Results of the tests and test logs will be shown in the terminal.

- Use command *npx playwright test* if you want to run all tests.

Run tests in UI mode

-  UI Mode for a better developer experience where you can easily walk through each step of the test and visually see what was happening before, during and after each step.
   UI mode also comes with many other features such as the locator picker, watch mode and more.

 - Use command *npx playwright test --ui* 

Run tests on different browsers
 
- Use command *npx playwright test --project=chromium*

Run tests in headed mode

- Use command *npx playwright test --headed*

Run specific test

- Use command npx playwright test BlogPostTest.spec.js

## **Reporting**
By Default Playwright framework uses 'The HTML Reporter' it shows you a full report of your tests allowing you to filter the report by browsers, passed tests, failed tests, skipped tests and flaky tests.
By default, the HTML report is opened automatically if some of the tests failed, otherwise you can open it with the following command.

- Use command npx playwright show-report

After using this command report will be generated under folder **'playwright-report'**

     ├── playwright-report                             
     |   ├── index.html
     

## **Core Folder Structure**
    ├── .circleci                               # Contains config.yml file for running tests using ci
    |
    |
    ├── pageobject                       
    |   │    
    |   │
    |   ├── pages                               # Generic functionality for tests
    |   │   |
    |   │   ├── HomePage.js                     # Home page testing functionality
    |   │   ├── LoginPage.js                    # Login page testing functionality
    |   │   ├── PostCreatePage.js               # PostCreate page testing functionality
    |   │   
    |   ├── fragments   
    |       |
    |       ├── BlogPanelFragment.js            # Blog panel fragment testing functionality
    |       ├── ProfileMenuFragment.js          # Profile menu fragment testing functionality 
    |
    ├── tests                               # Test suite
    |       ├── BlogPostTest.spec.js           # Automated Test Scripts for  verifying blog posting functionality    
    |
    │── playwright.config.js                # Confiuguration JavSacript File for playwright framework
 

