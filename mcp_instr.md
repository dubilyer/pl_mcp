Use Playwright MCP
------
Use Page Object pattern for test generation
add poms to /pom
always check if the page already exists and add locators and functions to the existing page object
always explore site with playwright before generation
when exploring, check the urls to use in 'navigate funcitons'
put web tests to /tests/web
------
For apis create an api specification files (like page objects with ready methods)
Put api specifications to /api
When analysing api docs, pay your attention on response schema, use it for validations
Put api tests to /tests/api
Always log the response body for api tests
------

Do not split the flow into multiple tests, keep it in one test as much as possible
if you see repeatable code - extract it (or to the separate file or inside one, according to logic)
Do not add unnecessary asserts, keep only the required in prompt
