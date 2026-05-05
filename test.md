# test

This is a test file for nxtdev-xyz repository.

## Purpose

Verifying that the Git setup, branch protection rules, and CI pipeline are working correctly.

## Checklist

- [ ] File created successfully
- [ ] Committed to a feature branch
- [ ] PR opened against `dev`
- [ ] CI workflow triggered
- [ ] Branch protection rules enforced
- [ ] PR merged after review

## Branch Flow Test

```bash
# Create a feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/test-branch-protection

# Add this file
git add test.md
git commit -m "chore: add test file to verify branch protection"
git push origin feature/test-branch-protection

# Now open a PR → dev on GitHub
# Verify CI runs and protection rules kick in
```

## Expected Result

Direct push to `main`, `dev`, or `v2` should be **blocked**.
All changes must go through a **Pull Request**.

---

*This file can be deleted after branch protection is verified.*
