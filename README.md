# বাজার দর (BazarDor)

প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখার ওয়েব অ্যাপ — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম, গতকালের সঙ্গে দামের পরিবর্তন এবং ১২টি বাজারের বাজারভিত্তিক বিস্তারিত দাম। কোন পণ্যের দাম বাড়ল, কোনটা কমল, আর কোন বাজারে সবচেয়ে সস্তা — সব তথ্য বাংলা সংখ্যায়, সহজভাবে সাজানো।

## Live Link

- **Live Site:** https://b14-bazar-dor-nine.vercel.app/
- **GitHub Repository:** https://github.com/mijanurdev/B14-BazarDor

## কীভাবে দেখবেন (How to Use)

- **হোম পেজ:** Live লিংকে ঢুকলেই হোম পেজ — সবার ওপরে চলমান প্রাইস টিকার (সব পণ্যের আজকের দাম ও পরিবর্তন), তারপর "আজ দাম বেড়েছে" ও "আজ দাম কমেছে" অংশ এবং সব পণ্যের তালিকা।
- **ক্যাটাগরি পেজ:** Navbar থেকে যেকোনো ক্যাটাগরিতে (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) click করলে ওই ক্যাটাগরির পণ্যগুলো আসবে। "সাজান" dropdown দিয়ে দাম কম থেকে বেশি কিংবা বেশি থেকে কম সাজানো যায়।
- **পণ্যের বিস্তারিত পেজ:** যেকোনো পণ্যের কার্ডে click করলে বিস্তারিত পেজ খুলবে (এই পেজ দেখতে সাইন ইন করতে হবে) — সেখানে দামের সারসংক্ষেপ (সর্বনিম্ন, সর্বাধিক, গড়) আর ১২টি বাজারের দামের তালিকা পাওয়া যাবে।
- **সাইন আপ / সাইন ইন:** ইমেইল ও পাসওয়ার্ড দিয়ে নতুন অ্যাকাউন্ট খোলা যায়; Google বা GitHub দিয়েও সাইন ইন করা যায়।
- **প্রোফাইল:** সাইন ইন করার পর নিজের প্রোফাইল দেখা যায় এবং নাম বদলে আপডেট করা যায়।

## Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | UI তৈরি ও পেজ navigation |
| TypeScript | Type-safe কোড লেখা |
| Tailwind CSS v4 | Styling ও responsive design |
| DaisyUI | Ready-made UI component |
| BetterAuth | সাইন ইন, সাইন আপ ও session পরিচালনা |
| MongoDB Atlas | ব্যবহারকারীর তথ্য সংরক্ষণ |
| React Hot Toast | সফল বা ব্যর্থ হওয়ার message দেখানো |

## Key Features

- লাইভ প্রাইস টিকার — সব পণ্যের আজকের দাম ও দামের পরিবর্তন চলমান strip-এ দেখা যায়
- হোম পেজে "আজ দাম বেড়েছে" ও "আজ দাম কমেছে" অংশসহ সব পণ্যের তালিকা
- ৮টি ক্যাটাগরিতে পণ্য ব্রাউজ করা এবং দাম অনুযায়ী সাজানো (কম থেকে বেশি, বেশি থেকে কম)
- প্রতিটি পণ্যের বিস্তারিত পেজ — দামের সারসংক্ষেপ (সর্বনিম্ন, সর্বাধিক, গড়) ও ১২টি বাজারের বাজারভিত্তিক দাম
- BetterAuth দিয়ে ইমেইল/পাসওয়ার্ড ও Google/GitHub সোশ্যাল লগইন; পণ্যের বিস্তারিত ও প্রোফাইল পেজ লগইন-সুরক্ষিত (সাইন ইন ছাড়া খুলবে না)
- প্রোফাইল পেজে নিজের তথ্য দেখা ও নাম আপডেট করা
- সম্পূর্ণ responsive ডিজাইন (মোবাইল, ট্যাবলেট ও ডেস্কটপ), বাংলা সংখ্যা ও বাংলা তারিখ

## NPM Packages Used

- `next`, `react`, `react-dom` — মূল framework
- `tailwindcss`, `@tailwindcss/turbopack`, `daisyui` — styling
- `better-auth`, `mongodb` — authentication ও database
- `react-hot-toast` — notification message

## Run Locally

নিজের কম্পিউটারে চালাতে চাইলে:

1. রিপোজিটরিটি clone করুন: `git clone https://github.com/mijanurdev/B14-BazarDor.git`
2. প্রজেক্ট ফোল্ডারে গিয়ে dependencies install করুন: `npm install`
3. প্রজেক্টের রুটে `.env.local` নামে একটি ফাইল তৈরি করে প্রয়োজনীয় মানগুলো বসান (কোন কোন মান লাগবে তা `.env.example` ফাইলে দেওয়া আছে): `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXT_PUBLIC_APP_URL`
4. Development server চালু করুন: `npm run dev`
5. ব্রাউজারে খুলুন: http://localhost:3000
