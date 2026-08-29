# Git Commands Reference

A quick reference guide for commonly used Git commands in this Playwright project.

## Basic Setup

### Clone a repository
```bash
git clone https://github.com/username/repository.git
```

### Configure your name and email
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Check your configuration
```bash
git config --list
```

## Staging and Committing

### Check status
```bash
git status
```

### Stage specific files
```bash
git add filename.ts
git add folder/
```

### Stage all changes
```bash
git add .
```

### Unstage a file
```bash
git reset filename.ts
```

### Commit changes
```bash
git commit -m "Brief description of changes"
```

### Commit with detailed message
```bash
git commit -m "Brief summary" -m "Detailed explanation of the changes"
```

### Amend the last commit (before pushing)
```bash
git commit --amend --no-edit
```

### Amend with new message
```bash
git commit --amend -m "New message"
```

## Branching

### List all branches
```bash
git branch
```

### List remote branches
```bash
git branch -r
```

### Create a new branch
```bash
git branch feature-name
```

### Switch to a branch
```bash
git checkout feature-name
```

### Create and switch to a new branch
```bash
git checkout -b feature-name
```

### Delete a branch locally
```bash
git branch -d feature-name
```

### Force delete a branch
```bash
git branch -D feature-name
```

## Remote Operations

### View remote repositories
```bash
git remote -v
```

### Add a remote
```bash
git remote add origin https://github.com/username/repository.git
```

### Push to remote
```bash
git push origin main
```

### Push a new branch
```bash
git push -u origin feature-name
```

### Pull from remote
```bash
git pull origin main
```

### Fetch updates (without merging)
```bash
git fetch origin
```

### Delete remote branch
```bash
git push origin --delete feature-name
```

## Viewing History

### View commit history
```bash
git log
```

### View last N commits
```bash
git log -n 5
```

### View history in one line per commit
```bash
git log --oneline
```

### View history with graph (branches)
```bash
git log --graph --oneline --all
```

### View changes in a commit
```bash
git show commit-hash
```

### View difference between commits
```bash
git diff commit1 commit2
```

### View difference in working directory
```bash
git diff
```

## Undoing Changes

### Discard changes in working directory
```bash
git checkout filename.ts
```

### Undo last commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Undo last commit (discard changes)
```bash
git reset --hard HEAD~1
```

### Revert a commit (creates new commit)
```bash
git revert commit-hash
```

### Stash changes (temporary storage)
```bash
git stash
```

### Apply stashed changes
```bash
git stash pop
```

### List stashed changes
```bash
git stash list
```

## Merging and Rebasing

### Merge a branch into current branch
```bash
git merge feature-name
```

### Rebase current branch onto another
```bash
git rebase main
```

### Continue rebase after resolving conflicts
```bash
git rebase --continue
```

### Abort rebase
```bash
git rebase --abort
```

## Conflict Resolution

### View conflicted files
```bash
git status
```

### Mark conflict as resolved
```bash
git add filename.ts
git commit -m "Resolve merge conflict"
```

### Abort merge
```bash
git merge --abort
```

## Useful Aliases

Add these to your git config to create shortcuts:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.log-graph "log --graph --oneline --all"
git config --global alias.unstage "reset HEAD"
```

Then use them:
```bash
git st          # instead of git status
git co main     # instead of git checkout main
git log-graph   # instead of git log --graph --oneline --all
```

## Common Workflows

### Feature branch workflow
```bash
# Create and switch to feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push -u origin feature/new-feature

# Create pull request on GitHub

# After PR is merged, switch back to main
git checkout main
git pull origin main

# Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Update your branch with latest main
```bash
git fetch origin
git rebase origin/main
```

### Commit and push changes
```bash
git add .
git commit -m "Description of changes"
git push
```

### View what you're about to push
```bash
git log origin/main..HEAD
```

## Tips & Tricks

### Search commit history
```bash
git log --grep="search term"
```

### Find who changed a line
```bash
git blame filename.ts
```

### Check which branches contain a commit
```bash
git branch --contains commit-hash
```

### Temporarily switch branches without committing
```bash
git stash
git checkout other-branch
# Make changes, commit, etc.
git checkout previous-branch
git stash pop
```

### See all changes made by a specific author
```bash
git log --author="name" --oneline
```

### Clean up merged branches
```bash
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

## Emergency Commands

### Restore a deleted file
```bash
git checkout HEAD^ filename.ts
```

### See what changes will be lost
```bash
git reflog
```

### Recover a deleted branch
```bash
git reflog
git checkout -b recovered-branch commit-hash
```

## Best Practices

1. **Commit often** — Small, focused commits are easier to review and debug
2. **Write meaningful messages** — Future you (and your team) will thank you
3. **Pull before push** — Always sync with remote before pushing
4. **Use branches** — Keep main stable, use feature branches for development
5. **Review before committing** — Use `git diff` to verify changes before staging
6. **Don't force push to main** — Only force push to your own feature branches
7. **Use .gitignore** — Exclude node_modules, build files, secrets, etc.

## Useful Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)
