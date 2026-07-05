export default function ToolLayout({ children }) {
  // यहाँ कोई Provider नहीं चाहिए, क्योंकि Root Layout में हमने इसे पहले ही डाल दिया है
  return <>{children}</>;
}