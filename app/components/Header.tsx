import {Box, Heading, VStack} from "@navikt/ds-react";
import {Logo} from "~/components/Logo";

export const Header = () => {
    return (
        <VStack align="center" className="font-sans">
            <Logo src="/images/novari_logo_small.png" width={250}/>
            <Box padding="5" maxWidth="text" as="header">
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
