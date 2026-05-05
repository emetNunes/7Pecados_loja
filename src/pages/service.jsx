import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useEffect, useMemo, useState } from "react";

import DefaultLayout from "@/layouts/default";
import ProductSection from "@/components/ui/service/product/ProductSection";
import ServiceMobile from "@/components/ui/service/serviceMobile";
import BillingSection from "@/components/ui/service/billing/BillingSection";

export default function ServicePage() {
  const [clientSelect, setClientSelect] = useState("");
  const isDesktop = true;

  return (
    <DefaultLayout>
      <main className="flex gap-4 items-start">
        {isDesktop ? (
          <>
            <div className="flex-1">
              <ProductSection />
            </div>

            <div className="w-[30%]">
              <div className="fixed top-4 w-[28%] h-screen ">
                <div className="bg-base p-4 rounded-2xl h-[95%] overflow-auto">
                  <BillingSection clientID />
                </div>
              </div>
            </div>
          </>
        ) : (
          <ServiceMobile />
        )}
      </main>
    </DefaultLayout>
  );
}
