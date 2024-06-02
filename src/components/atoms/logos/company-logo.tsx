import Image from "next/image";
import Link from "next/link";
import React from "react";

const CompanyLogo = () => {
  return (
    //TODO: Change the link to the company's website
    <Link href={"/"}>
      <Image
        src={`/logo/company-logo.png`}
        width={150}
        height={150}
        alt="Company Logo"
      />
    </Link>
  );
};

export default CompanyLogo;
