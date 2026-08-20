def get_final_price(price, discount, shipping):
    return price - (price * discount / 100) + shipping

fp = int(input())
fd = int(input())
fs = int(input())

sp = int(input())
sd = int(input())
ss = int(input())

ap = int(input())
ad = int(input())
ass = int(input())

flipkart_price = get_final_price(fp, fd, fs)
snapdeal_price = get_final_price(sp, sd, ss)
amazon_price = get_final_price(ap, ad, ass)

print(f"In Flipkart: Rs.{flipkart_price:.2f}")
print(f"In Snapdeal: Rs.{snapdeal_price:.2f}")
print(f"In Amazon: Rs.{amazon_price:.2f}")

if flipkart_price <= snapdeal_price and flipkart_price <= amazon_price:
    print("Choose Flipkart")
elif snapdeal_price <= amazon_price:
    print("Choose Snapdeal")
else:
    print("Choose Amazon")