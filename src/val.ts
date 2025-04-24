
import { z } from 'zod';

// const nameSchema = z.string();
// nameSchema.parse("John"); // ✅
// nameSchema.parse(42);     // ❌ throws ZodError


z.string().min(3).max(10);
z.number().min(1).max(100);