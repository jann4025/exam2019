# exam2019

## Coding standards
`All styling most be done in scss in the folder /src/scss/*.scss`

* [Airbnb Javascript Style guide](https://github.com/airbnb/javascript) for general javascript.
* [Airbnb CSS Style guide](https://github.com/airbnb/css) for css/scss.
* [Airbnb React/JSX Style guide](https://github.com/airbnb/javascript/tree/master/react) for React & Jsx.


## Workflow

### Pull
Pull every time you start working on the project - If you get a pull/merge conflict make sure to ask the last person to push the repository about what to keep and not to keep.
After solving the pull/merge conflict make sure to make following commands before you start working: <br/>
`git add --all` <br/>
`git commit -m "Solving merge conflicts"` <br/>
`git push` <br/>

### Branches
Always work in branches. (Work only in master, if you have talked with the other group members about it)

**Naming the branch** <br/>
Name the branch based on wich part of the product you are working on. As example if you're working on styling the header do NOT call the branch "styling" but instead name the branch "Header".

**How to create the branch** <br/>
If you already are in another branch than master go back to the master by using following command `git checkout master`.
When you are in the master add the new branch with following command `git branch Header`.

**You can always check wich brand you are working in with the following command `git branch` - The branch turning green is the branch you are currently working in **

**Merge the sub branches with master** <br/>
Do not merge the branches with master alone, this is something we always do together.

Merge the branches with following commands `git checkout master`(To make sure you are in the master while merging) `git merge Header`(To merge the branch Header or another branch with master).

After merging delete the branch on the github.com repo

### Commits
Commit as offen as posible. Commit when something is "Done" or atleast the part youve been working on is working

**Commit messages:** <br/>
Make sure to add commit messages that tells exactly what the commit is doing. As example if you fixed a bug in a function the commit message example could be: "Fixing calculator error in function 'randomNumberCalculator()'

## Style guide
[Insert link to style guide](https://jannickholm.dk)


## Wireframe & Mockup
[Insert link to wireframe](https://jannickholm.dk)
[Insert link to Mockup](https://jannickholm.dk)
