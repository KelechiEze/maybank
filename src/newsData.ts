export interface NewsItem {
  id: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
}

const currentDate = new Date().toLocaleDateString('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric'
});

export const newsData: NewsItem[] = [
  {
    id: "global-markets-2024",
    image: "https://images.unsplash.com/photo-1611974714024-4607a5a48191?auto=format&fit=crop&q=80&w=1000",
    category: "Market",
    title: "Global Markets React to New Economic Policies",
    excerpt: "The recent shift in international trade agreements has triggered a significant response across global financial hubs...",
    content: `
      <p>The global financial landscape is currently navigating a period of significant recalibration as major economies introduce new trade policies and fiscal measures. Analysts from May Bank's Global Research division have noted that the volatility observed in the past week is a direct reflection of investor uncertainty regarding long-term interest rate trajectories.</p>
      
      <h3>Key Market Drivers</h3>
      <p>Several factors are contributing to the current market sentiment. Firstly, the unexpected adjustment in export tariffs between major trading blocs has led to a re-evaluation of supply chain costs. Companies in the manufacturing and technology sectors are particularly sensitive to these changes, leading to a cautious approach in capital expenditure.</p>
      
      <p>Secondly, central banks are maintaining a hawkish stance as they continue to battle persistent inflationary pressures. While some indicators suggest a cooling down, the labor market remains tight, providing little room for immediate rate cuts.</p>
      
      <h3>May Bank's Perspective</h3>
      <p>"We are advising our clients to maintain a diversified portfolio with a slight tilt towards defensive sectors," says Sarah Jenkins, Chief Investment Officer at May Bank. "While the short-term noise is loud, the underlying fundamentals of the global economy remain resilient. We expect to see a stabilization in the coming quarter as the impact of these new policies is fully absorbed by the markets."</p>
      
      <h3>Looking Ahead</h3>
      <p>Investors should keep a close eye on the upcoming quarterly earnings reports, which will provide a clearer picture of how corporations are managing the increased cost of capital. Additionally, geopolitical developments will continue to play a crucial role in shaping market dynamics.</p>
    `,
    date: currentDate,
    author: "Sarah Jenkins",
    readTime: "5 min read"
  },
  {
    id: "biometric-security-launch",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    category: "Innovation",
    title: "May Bank Launches Next-Gen Biometric Security",
    excerpt: "Our new security layer uses advanced facial recognition and behavioral patterns to ensure your account is safer than ever...",
    content: `
      <p>In an era where digital security is paramount, May Bank is proud to announce the rollout of its most advanced security framework to date. The "MayShield" Biometric Suite is designed to provide seamless yet impenetrable protection for our customers' digital assets.</p>
      
      <h3>Advanced Behavioral Analytics</h3>
      <p>Unlike traditional security measures that rely solely on static passwords or simple fingerprints, MayShield utilizes behavioral biometrics. This technology analyzes patterns such as typing speed, touch pressure, and device orientation to create a unique "digital signature" for every user. If a session deviates from these established patterns, the system automatically triggers additional verification steps.</p>
      
      <h3>Facial Recognition 2.0</h3>
      <p>The suite also includes an upgraded facial recognition system that works effectively in low-light conditions and can distinguish between a live person and a high-resolution photograph or video. This "liveness detection" is a critical component in preventing spoofing attacks.</p>
      
      <h3>Privacy First</h3>
      <p>May Bank remains committed to user privacy. All biometric data is encrypted and stored locally on the user's device in a secure enclave. The bank does not store actual biometric images or templates on its servers, ensuring that your personal data remains under your control.</p>
      
      <p>"Our goal is to make banking as secure as it is convenient," says David Chen, Chief Technology Officer at May Bank. "With MayShield, we are moving beyond traditional authentication to a more holistic, intelligent approach to security."</p>
    `,
    date: currentDate,
    author: "David Chen",
    readTime: "4 min read"
  },
  {
    id: "bank-of-the-year-2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    category: "Award",
    title: "May Bank Named 'Bank of the Year' 2024",
    excerpt: "We are honored to receive this prestigious recognition for our commitment to excellence and customer-centric innovation.",
    content: `
      <p>May Bank has been officially recognized as the 'Bank of the Year' for 2024 by the International Financial Review. This prestigious award highlights our dedication to providing exceptional financial services and our continuous efforts in digital transformation.</p>
      
      <h3>A Year of Growth</h3>
      <p>Over the past twelve months, May Bank has seen a 15% increase in its active user base, driven largely by the success of our mobile-first strategy and the introduction of personalized wealth management tools. Our commitment to transparency and ethical banking has also resonated strongly with a new generation of investors.</p>
      
      <h3>Innovation at the Core</h3>
      <p>The judges specifically noted May Bank's rapid adoption of AI-driven customer support and its seamless integration of cross-border payment solutions. "May Bank has demonstrated that it is possible to be both a traditional pillar of stability and a leader in fintech innovation," the awards committee stated.</p>
      
      <h3>Thanking Our Customers</h3>
      <p>"This award belongs to our customers," says Michael Thorne, CEO of May Bank. "Your trust and feedback have been the driving force behind every innovation we've implemented. We remain committed to being your most trusted financial partner as we move into 2025 and beyond."</p>
    `,
    date: currentDate,
    author: "Michael Thorne",
    readTime: "3 min read"
  }
];
