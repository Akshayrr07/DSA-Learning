def select_activities(start, end):
    # Zip and sort activities by their finish times
    activities = sorted(list(zip(start, end, range(len(start)))), key=lambda x: x[1])
    
    selected = []
    # The first activity is always selected
    selected.append(activities[0])
    last_finish_time = activities[0][1]
    
    for i in range(1, len(activities)):
        # If this activity has start time greater than or equal to the finish time of previously selected activity
        if activities[i][0] >= last_finish_time:
            selected.append(activities[i])
            last_finish_time = activities[i][1]
            
    return selected

if __name__ == "__main__":
    start = [1, 3, 0, 5, 8, 5]
    end   = [2, 4, 6, 7, 9, 9]
    
    # Expected output: (1, 2), (3, 4), (5, 7), (8, 9)
    result = select_activities(start, end)
    print("Selected activities (Start, End, Original Index):")
    for act in result:
        print(f"Activity {act[2]}: ({act[0]}, {act[1]})")
