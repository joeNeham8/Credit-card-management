"use client";
import {
    Box,
    Heading,
    Text,
    VStack,
    Icon,
    Flex,
    Container,
} from "@chakra-ui/react";
import { FaUser, FaChartLine, FaTasks } from "react-icons/fa";

export default function HowItWorks() {
    return (
        <Box py={16} color="black">
            <Container maxW="1200px">
                <Heading
                    as="h2"
                    size="2xl"
                    textAlign="center"
                    mb={8}
                    fontFamily="var(--font-primary)"
                    color={"var(--text-color)"}
                >
                    How it works
                </Heading>

                <Text
                    textAlign="center"
                    mb={12}
                    fontSize="lg"
                    fontFamily="var(--font-primary)"
                >
                    Our Credit Card management tool simplifies Credit card
                    holding, performance tracking, and task assignment, offering
                    a streamlined experience for users.
                </Text>

                <Flex justify="space-around" wrap="wrap">
                    <VStack
                        bg="#004246"
                        color="white"
                        borderRadius={"3xl"}
                        p={8}
                        m={4}
                        maxW="320px"
                        textAlign="center"
                        boxShadow="lg"
                    >
                        <Icon
                            as={FaUser}
                            boxSize={12}
                            color="var(--accent-color)"
                            mb={4}
                        />
                        <Heading
                            size="md"
                            fontFamily="var(--font-heading)"
                            fontSize={22}
                        >
                            Register User
                        </Heading>
                        <Text
                            fontSize="l"
                            mt={2}
                            fontWeight={"500"}
                            fontFamily="var(--font-heading)"
                        >
                            Easily register new user with all necessary
                            information like name, email and contact details.
                        </Text>
                    </VStack>

                    <VStack
                        bg="#004246"
                        color="white"
                        borderRadius={"3xl"}
                        p={8}
                        m={4}
                        maxW="320px"
                        textAlign="center"
                        boxShadow="lg"
                    >
                        <Icon
                            as={FaChartLine}
                            boxSize={12}
                            color="var(--accent-color)"
                            mb={4}
                        />
                        <Heading
                            size="md"
                            fontFamily="var(--font-heading)"
                            fontSize={22}
                        >
                            Manage Card Data
                        </Heading>
                        <Text
                            fontSize="l"
                            mt={2}
                            fontWeight={"500"}
                            fontFamily="var(--font-heading)"
                        >
                            Keep track of all cards, including personal details,
                            performance metrics and much more
                        </Text>
                    </VStack>

                    <VStack
                        bg="#004246"
                        color="white"
                        borderRadius={"3xl"}
                        p={8}
                        m={4}
                        maxW="320px"
                        textAlign="center"
                        boxShadow="lg"
                    >
                        <Icon
                            as={FaTasks}
                            boxSize={12}
                            color="var(--accent-color)"
                            mb={4}
                        />
                        <Heading
                            size="md"
                            fontFamily="var(--font-heading)"
                            fontSize={22}
                        >
                            Assign and Track logs
                        </Heading>
                        <Text
                            fontSize="l"
                            fontStyle="bd"
                            mt={2}
                            fontFamily="var(--font-heading)"
                            fontWeight={"500"}
                        >
                            Assign limits to monitor logs to ensure deadlines
                            are met efficiently.
                        </Text>
                    </VStack>
                </Flex>
            </Container>
        </Box>
    );
}
