import { Contract } from "~/utils/contractsLoader";
import React from "react";
import { Box, Link } from "@navikt/ds-react";

interface CommonProps {
  contracts: Contract[];
  submit: (contractId: string) => void;
}

export const Common: React.FC<CommonProps> = ({ contracts, submit }) => (
  <Box>
    <Box as="p"
         className="w-full text-left font-bold pr-4 py-2 mt-5 text-base text-gray-700 hover:bg-gray-100 flex items-center">
      Andre påloggingsalternativer:
    </Box>

    {contracts
      .map((item) => (
        <Link
          as="button"
          key={ item.cardId }
          className="w-full text-left pr-4 py-1 text-base text-gray-700 hover:bg-gray-100 flex items-center uppercase"
          style={{ textDecoration: "none", color: "black" }}
          onClick={ () => submit(item.cardId) }
        >
          {item.image &&
            <img src={ `data:${item.image.mimeType };base64,${ item.image.base64Image }`} alt={ item.displayName }
                 className="w-8 h-8 mr-2"/>}{ item.displayName }
        </Link>
      ))
    }
  </Box>
);
