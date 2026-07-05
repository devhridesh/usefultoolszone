import { redirect } from 'next/navigation';

export default function Page() {
  // यह लाइन यूजर को होमपेज (/) से सीधे कंप्रेसर पेज (/compress) पर भेज देगी
  redirect('/compress');
}