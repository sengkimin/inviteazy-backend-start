import { z } from 'zod';


const nameSchema = z.string();

try {
  nameSchema.parse("John");
  console.log("✅ 'John' is a valid name.");
  
  nameSchema.parse(42); 
  console.log("✅ 42 is a valid name."); 
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("❌ Validation error:", error.errors); 
  } else {
    console.log("❌ An unexpected error occurred:", error);
  }
}
