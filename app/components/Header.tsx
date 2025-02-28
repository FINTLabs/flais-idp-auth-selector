import {Box, Heading, VStack} from "@navikt/ds-react";
import {Logo} from "~/components/Logo";

export const Header = () => {
    return (
        <VStack align="center" className="font-sans">
            <Logo src="/images/novari_logo_small.png" width={250}/>
            <Box maxWidth="text" as="header" className="header">
                <Box>
                    <Heading
                        level="1"
                        size="xlarge"
                        align="start"
                        className="purple-heading"
                    >
                        Logg på
                    </Heading>
                </Box>
                <Box>
                    <Heading
                        size="xsmall"
                        as="p"
                        className="italic-heading"
                    >
                        Velg tilhørlighet for å logge på tjenesten
                    </Heading>
                </Box>
            </Box>
        </VStack>
    );
};
