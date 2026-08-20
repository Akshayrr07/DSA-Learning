#include <iostream>
#include <vector>
#include <algorithm>

struct Activity {
    int start, end, id;
};

bool compareActivities(Activity a, Activity b) {
    return a.end < b.end;
}

void selectActivities(std::vector<Activity>& activities) {
    std::sort(activities.begin(), activities.end(), compareActivities);
    
    std::cout << "Selected activities:\n";
    // First activity is always selected
    std::cout << "Activity " << activities[0].id << ": (" << activities[0].start << ", " << activities[0].end << ")\n";
    
    int lastEnd = activities[0].end;
    for (size_t i = 1; i < activities.size(); ++i) {
        if (activities[i].start >= lastEnd) {
            std::cout << "Activity " << activities[i].id << ": (" << activities[i].start << ", " << activities[i].end << ")\n";
            lastEnd = activities[i].end;
        }
    }
}

int main() {
    std::vector<Activity> activities = {
        {1, 2, 0}, {3, 4, 1}, {0, 6, 2}, {5, 7, 3}, {8, 9, 4}, {5, 9, 5}
    };
    selectActivities(activities);
    return 0;
}
