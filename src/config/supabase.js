/**
 * ไฟล์ Supabase Configuration
 * บทบาท: เชื่อมต่อกับ Supabase database (PostgreSQL)
 * Author: Student Course Management Team
 */

// 📦 นำเข้า Supabase client library
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// 🔑 ดึง environment variables
const supabaseUrl = process.env.SUPABASE_URL; // ✅ URL ของ Supabase project
const supabaseKey = process.env.SUPABASE_API_KEY; // ✅ API Key ของ Supabase

// ⚠️ ตรวจสอบว่า environment variables ครบถ้วน
if (!supabaseUrl || !supabaseKey) {
  throw new Error('⚠️ Missing SUPABASE_URL or SUPABASE_API_KEY in environment variables');
}

// 🔗 สร้าง Supabase client instance
const supabase = createClient(supabaseUrl, supabaseKey);

// 📤 ส่งออก Supabase client ไปใช้ในไฟล์อื่น ๆ
module.exports = supabase;
