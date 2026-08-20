function selectActivities(activities) {
    // Sort activities by end time
    activities.sort((a, b) => a.end - b.end);

    const selected = [];
    selected.push(activities[0]);
    let lastEnd = activities[0].end;

    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastEnd) {
            selected.push(activities[i]);
            lastEnd = activities[i].end;
        }
    }
    return selected;
}

// Test cases
const activities = [
    { start: 1, end: 2, id: 0 },
    { start: 3, end: 4, id: 1 },
    { start: 0, end: 6, id: 2 },
    { start: 5, end: 7, id: 3 },
    { start: 8, end: 9, id: 4 },
    { start: 5, end: 9, id: 5 }
];

const result = selectActivities(activities);
console.log("Selected activities:");
result.forEach(act => {
    console.log(`Activity ${act.id}: (${act.start}, ${act.end})`);
});
