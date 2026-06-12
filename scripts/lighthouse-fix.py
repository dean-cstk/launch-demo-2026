#!/usr/bin/env python3
"""
lighthouse-fix.py — Lighthouse AI Fix Utility (git operations only)
--------------------------------------------------------------------
Handles local git operations for the Cowork daily Lighthouse AI Fix workflow.
Network calls (PageSpeed Insights API, GitHub PR API) are made via the
Claude in Chrome browser tool, which bypasses the bash sandbox proxy.

Commands:
  branch <name>         — Reset to main, create + checkout a new branch
  commit <name> <msg>   — Stage all changes, commit, push to origin
  status                — Print git status (useful to check if there are changes)
  read-env              — Print non-secret env values from .env.lighthouse

Reads config from .env.lighthouse in the repo root:
  GITHUB_PAT=ghp_...
  GITHUB_REPO=systemsconsciousness/launch-demo-2026   (optional)
"""

import json
import os
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = REPO_ROOT / ".env.lighthouse"
DEFAULT_REPO = "dean-cstk/launch-demo-2026"


def load_env() -> dict:
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                env[k.strip()] = v.strip()
    for key in ("GITHUB_PAT", "GITHUB_REPO"):
        if key in os.environ:
            env[key] = os.environ[key]
    return env


def git(*args: str, check: bool = True) -> subprocess.CompletedProcess:
    result = subprocess.run(
        ["git", "-C", str(REPO_ROOT), *args],
        capture_output=True, text=True, check=False
    )
    if result.returncode != 0 and check:
        print(f"[git error] {result.stderr.strip()}", file=sys.stderr)
        sys.exit(result.returncode)
    return result


def cmd_branch(branch_name: str, pat: str, repo: str):
    remote_url = f"https://x-access-token:{pat}@github.com/{repo}.git"
    git("remote", "set-url", "origin", remote_url)
    git("fetch", "origin", "main")
    git("checkout", "main")
    git("reset", "--hard", "origin/main")
    git("branch", "-D", branch_name, check=False)  # delete if exists
    git("checkout", "-b", branch_name)
    print(f"OK: branch '{branch_name}' created and checked out")


def cmd_commit(branch_name: str, message: str):
    status = git("status", "--porcelain")
    if not status.stdout.strip():
        print("NO_CHANGES: nothing to commit — site already optimal")
        sys.exit(0)
    git("add", "-A")
    git("commit", "-m", message)
    result = git("push", "--force-with-lease", "origin", branch_name)
    print(f"OK: committed and pushed branch '{branch_name}'")


def cmd_status():
    result = git("status", "--short")
    print(result.stdout or "(clean — no changes)")


def cmd_read_env():
    env = load_env()
    out = {k: v for k, v in env.items() if k != "GITHUB_PAT"}
    out["GITHUB_PAT"] = "***" if "GITHUB_PAT" in env else "(not set)"
    out["REPO_ROOT"] = str(REPO_ROOT)
    out["DEFAULT_REPO"] = DEFAULT_REPO
    print(json.dumps(out, indent=2))


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    cmd = sys.argv[1]
    env = load_env()

    if cmd == "branch":
        if len(sys.argv) < 3:
            print("Usage: lighthouse-fix.py branch <branch-name>"); sys.exit(1)
        pat = env.get("GITHUB_PAT")
        if not pat:
            print("ERROR: GITHUB_PAT not set in .env.lighthouse"); sys.exit(1)
        repo = env.get("GITHUB_REPO", DEFAULT_REPO)
        cmd_branch(sys.argv[2], pat, repo)

    elif cmd == "commit":
        if len(sys.argv) < 4:
            print("Usage: lighthouse-fix.py commit <branch-name> <message>"); sys.exit(1)
        cmd_commit(sys.argv[2], sys.argv[3])

    elif cmd == "status":
        cmd_status()

    elif cmd == "read-env":
        cmd_read_env()

    else:
        print(f"Unknown command: {cmd}"); sys.exit(1)


if __name__ == "__main__":
    main()
