/**
 * Kill processes occupying dev server ports (Windows).
 * Run before `pnpm dev` to avoid port conflicts from stale processes.
 */
const { execSync } = require("child_process");

const PORTS = [5173];

for (const port of PORTS) {
  try {
    const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, {
      encoding: "utf8",
    });
    const pids = [
      ...new Set(
        output
          .trim()
          .split("\n")
          .map((line) => line.trim().split(/\s+/).pop())
          .filter(Boolean)
      ),
    ];
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`);
        console.log(`Killed PID ${pid} on port ${port}`);
      } catch {
        // Process may have already exited
      }
    }
  } catch {
    // No process on this port — that's fine
  }
}
