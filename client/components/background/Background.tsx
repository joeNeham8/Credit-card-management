import { Box } from "@chakra-ui/react";

export function Background() {
    return (
        <Box
            position="absolute"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            zIndex="-2" // Keeps it behind everything
            bg="white"
            backgroundImage="radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))"
        />
    );
}
