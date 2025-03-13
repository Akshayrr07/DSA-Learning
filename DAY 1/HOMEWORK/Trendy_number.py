def is_trendy_number(number):
    if 100 <= number < 1000:
        middle_digit = (number // 10) % 10
        return middle_digit % 3 == 0
    return False

n = int(input("Enter a number: "))
if 100 <= n < 1000:
    if is_trendy_number(n):
        print("Trendy Number")
    else:
        print("Not a Trendy Number")
else:
    print("Invalid Number")