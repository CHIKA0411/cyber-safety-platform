#
# A Python script to generate a synthetic dataset for contact number classification.
# This script creates a CSV file with two columns: 'phone_number' and 'label'.
#
# The dataset includes examples of "safe" and "unsafe" numbers.
# "Safe" numbers follow common formatting conventions.
# "Unsafe" numbers are generated with patterns often found in spam (e.g., incorrect length,
# repeating digits, known toll-free numbers, etc.).
#

import csv
import random
import re

def generate_safe_number():
    """Generates a realistic-looking 'safe' phone number in various formats."""
    formats = [
        # Format 1: +1-XXX-XXX-XXXX (US format)
        "+1-{}-{}-{}".format(random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999)),
        # Format 2: (XXX) XXX-XXXX (US format)
        "({}) {}-{}".format(random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999)),
        # Format 3: XXX-XXX-XXXX (US format)
        "{}-{}-{}".format(random.randint(100, 999), random.randint(100, 999), random.randint(1000, 9999)),
        # Format 4: +44 20 XXXX XXXX (UK format)
        "+44 20 {}{}{}{} {}{}{}{}".format(
            random.randint(1, 9), random.randint(0, 9), random.randint(0, 9), random.randint(0, 9),
            random.randint(0, 9), random.randint(0, 9), random.randint(0, 9), random.randint(0, 9)),
        # Format 5: XXXXXXXXXX (unformatted)
        "{}{}{}{}{}{}{}{}{}{}".format(
            random.randint(1, 9), random.randint(0, 9), random.randint(0, 9), random.randint(0, 9),
            random.randint(0, 9), random.randint(0, 9), random.randint(0, 9), random.randint(0, 9),
            random.randint(0, 9), random.randint(0, 9)),
    ]
    return random.choice(formats)

def generate_unsafe_number():
    """Generates a number with characteristics of 'unsafe' or spam numbers."""
    patterns = [
        # Pattern 1: Common spam prefix (e.g., 800, 855)
        "1-800-{}-{}".format(random.randint(100, 999), random.randint(1000, 9999)),
        "1-855-{}-{}".format(random.randint(100, 999), random.randint(1000, 9999)),
        # Pattern 2: Short or incomplete numbers
        "{}".format(random.randint(1000000, 9999999)),
        "{}".format(random.randint(10000, 99999)),
        # Pattern 3: Repeating or easy-to-guess digits
        "{}000000000".format(random.randint(1, 9)),
        "555-555-5555",
        "111-222-3333",
        "123-456-7890",
        # Pattern 4: Numbers with non-standard characters
        "555-abc-defg",
        "555-123-456?",
        # Pattern 5: Extremely long numbers
        "{}".format(random.randint(10**12, 10**15)),
    ]
    return random.choice(patterns)

def generate_dataset(num_samples=100000):
    """
    Generates a CSV file containing a balanced dataset of safe and unsafe phone numbers.
    
    Args:
        num_samples (int): The total number of rows to generate in the dataset.
    """
    filename = "large_contact_number_dataset.csv"
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["phone_number", "label"])

        # Generate half 'safe' and half 'unsafe' samples to create a balanced dataset
        safe_count = num_samples // 2
        unsafe_count = num_samples - safe_count

        for _ in range(safe_count):
            writer.writerow([generate_safe_number(), "safe"])

        for _ in range(unsafe_count):
            writer.writerow([generate_unsafe_number(), "unsafe"])
    
    print(f"Successfully generated a dataset with {num_samples} samples: {filename}")

# Run the dataset generation script
if __name__ == "__main__":
    generate_dataset()
