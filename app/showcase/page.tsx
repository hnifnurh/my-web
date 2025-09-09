"use client";

import ComingSoon from '@/components/ComingSoon'
import MediaSwitch from "@/components/shared/media-query-switcher";
import ShowcasePageDekstop from '@/components/showcase/screens/desktop';

export default function ShowcasePage() {
  return (
    <MediaSwitch
      mobile={<ComingSoon />}
      desktop={<ShowcasePageDekstop />}
      screenWidth={1024}
    />
  )
}