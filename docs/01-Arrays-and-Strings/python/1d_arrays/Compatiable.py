# Read an integer n from input
n = int(input())

# Read n integers from input and store them in list a
a = [int(input()) for _ in range(n)]

# Read an integer m from input
m = int(input())

# Read m integers from input and store them in list b
b = [int(input()) for _ in range(m)]

# Check if the lengths of both lists are equal
if n == m:
    # Initialize a flag variable c to False
    c = False
    
    # Check if every element in list a is greater than or equal to the corresponding element in list b
    if all(a[i] >= b[i] for i in range(n)):
        # If the condition is true, set c to True
        c = True
    else:
        # If the condition is false, set c to False
        c = False
    
    # Print "Compatible" if c is True, otherwise print "Incompatible"
    print("Compatible" if c else "Incompatible")
else:
    # If the lengths of the lists are not equal, print "Incompatible"
    print("Incompatible")
