import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class ActivitySelection {
    static class Activity {
        int start, end, id;
        Activity(int start, int end, int id) {
            this.start = start;
            this.end = end;
            this.id = id;
        }
    }

    public static void selectActivities(ArrayList<Activity> list) {
        // Sort by end time
        list.sort(Comparator.comparingInt(a -> a.end));

        System.out.println("Selected activities:");
        Activity first = list.get(0);
        System.out.println("Activity " + first.id + ": (" + first.start + ", " + first.end + ")");
        
        int lastEnd = first.end;
        for (int i = 1; i < list.size(); i++) {
            Activity current = list.get(i);
            if (current.start >= lastEnd) {
                System.out.println("Activity " + current.id + ": (" + current.start + ", " + current.end + ")");
                lastEnd = current.end;
            }
        }
    }

    public static void main(String[] args) {
        ArrayList<Activity> activities = new ArrayList<>();
        activities.add(new Activity(1, 2, 0));
        activities.add(new Activity(3, 4, 1));
        activities.add(new Activity(0, 6, 2));
        activities.add(new Activity(5, 7, 3));
        activities.add(new Activity(8, 9, 4));
        activities.add(new Activity(5, 9, 5));

        selectActivities(activities);
    }
}
