public class RightAnglePattern {
    public static void main(String[] args) {
        int n = 5;
        if (args.length > 0) {
            try {
                n = Integer.parseInt(args[0]);
            } catch (NumberFormatException e) {
                System.out.println("Invalid number. Defaulting to 5.");
            }
        } else {
            System.out.println("Usage: java RightAnglePattern [size]");
            System.out.println("Defaulting to size 5:\n");
        }
        
        for (int i = 1; i <= n; i++) {
            System.out.println("*".repeat(i));
        }
    }
}
