# Read an integer input from the user and store it in variable 'n'
n = int(input())

# Create a list 'a' by reading 'n' integer inputs from the user
a = [int(input()) for _ in range(n)]

# Convert the list 'a' to a set to remove duplicate elements and get the number of distinct elements
# Print the number of distinct elements in the array
print("There are", len(set(a)), "distinct elements in the array")
