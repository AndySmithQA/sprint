# Quickstart: Kanban Task Flow Board

## Prerequisites
- Node.js 20+
- npm

## Setup
1. Install dependencies:
   - npm install
2. Add date utility dependency required by this feature:
   - npm install date-fns
3. Start development server:
   - npm run dev

## Manual Validation Flow (Post-Content)
1. Open the app in browser.
2. Confirm Todo, In Progress, Done sections appear with even desktop distribution.
3. Update project title and end goal date in header.
4. Create a Todo task with:
   - name
   - description
   - start date
   - number of days to complete
5. Confirm the new card appears in Todo with calculated due date display.
6. If due date exceeds project end goal date, confirm a warning appears but task is still created.
7. Select Started on the card and verify move to In Progress.
8. Select Completed and verify move to Done.
9. Refresh browser and confirm board metadata and cards are restored from localStorage.
10. Change system date or task dates to validate overdue color behavior for non-Done tasks.

## Notes
- Task detail editing after creation is intentionally unsupported.
- Date rendering and comparisons should use date-fns consistently.
- UI must remain light themed and responsive across common viewport sizes.
