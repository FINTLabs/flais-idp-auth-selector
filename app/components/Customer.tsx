import React, { useEffect } from "react";
import { Contract } from "~/utils/contractsLoader";
import {Box, Button, Checkbox} from "@navikt/ds-react";
import {useCookies} from "react-cookie";
import {Dropdown} from "~/components/Dropdown";


export interface CustomerProps {
    contracts: Contract[];
    submit: (contractId: string) => void;
}

export const Customer: React.FC<CustomerProps> = ({ contracts, submit }) => {
    const [cookies, setCookies] = useCookies(['rememberOrganisation']);
    const [selectedContract, setSelectedContract] = React.useState<Contract | null>(null);

    const rememberMe = React.useMemo(() => cookies.rememberOrganisation != null, [cookies.rememberOrganisation]);

    useEffect(() => {
        if (!selectedContract && rememberMe) {
            setSelectedContract(contracts.find((contract) => contract.cardId === cookies.rememberOrganisation) ?? null);
        }
    }, [rememberMe]);

    const handleSelectContract = (contract: Contract) => {
        setSelectedContract(contract);
        if (rememberMe) setCookies('rememberOrganisation', contract?.cardId, { maxAge: 900000 })
    }

    const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = event.target;
        if (checked && !!selectedContract) setCookies('rememberOrganisation', selectedContract.cardId, { maxAge: 900000 })
        else setCookies('rememberOrganisation', null, { maxAge: 0 })
    }

    return (
        <Box>
            <Dropdown
                contracts={ contracts }
                selectedContract={ selectedContract }
                setSelectedContract={ handleSelectContract }
            />
            <Box>
                <Checkbox
                    className="mt-5 checkbox"
                    checked={ rememberMe }
                    onChange={ handleRememberMe }
                    disabled={ !selectedContract }
                    name="rememberMe"
                >Husk meg</Checkbox>
            </Box>
            <Button
                className="w-full button-style"
                disabled={ !selectedContract }
                onClick={ () => submit(selectedContract?.cardId as string) }
            >Fortsett</Button>
        </Box>
    );
}
