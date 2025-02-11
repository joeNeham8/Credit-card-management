"use client";

import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    Icon,
    HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaShieldAlt, FaWallet, FaRegSmile } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const MotionBox = motion(Box);

export default function Hero() {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
    }, []);

    return (
        <Box
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="linear-gradient(135deg, #F7FAFC, #E2E8F0)"
            color="gray.800"
            px={6}
        >
            <VStack spacing={6} maxW="700px" mx="auto">
                {/* Heading */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
                    transition={{ duration: 0.8 }}
                >
                    <Heading
                        as="h1"
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight="bold"
                        lineHeight="1.2"
                    >
                        Take Control of Your{" "}
                        <Text as="span" bgGradient="linear(to-r, teal.500, blue.600)" bgClip="text">
                            Credit Cards
                        </Text>
                    </Heading>

                    <Text fontSize="lg" mt={3} color="gray.600">
                        Manage transactions, track spending, and stay ahead with our
                        advanced credit card management system.
                    </Text>

                    <Button
                        mt={6}
                        size="lg"
                        colorScheme="blue"
                        _hover={{ transform: "scale(1.05)" }}
                        transition="all 0.3s"
                    >
                        Get Started
                    </Button>
                </MotionBox>

                {/* Features Section */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <HStack mt={8} spacing={6} justify="center">
                        <VStack
                            p={4}
                            bg="white"
                            boxShadow="md"
                            borderRadius="lg"
                            w="150px"
                        >
                            <Icon as={FaWallet} boxSize={8} color="blue.400" />
                            <Text fontSize="2xl" fontWeight="bold">500+</Text>
                            <Text fontSize="sm" color="gray.500">Cards Managed</Text>
                        </VStack>

                        <VStack
                            p={4}
                            bg="white"
                            boxShadow="md"
                            borderRadius="lg"
                            w="150px"
                        >
                            <Icon as={FaShieldAlt} boxSize={8} color="green.400" />
                            <Text fontSize="2xl" fontWeight="bold">Secure</Text>
                            <Text fontSize="sm" color="gray.500">Encrypted Data</Text>
                        </VStack>

                        <VStack
                            p={4}
                            bg="white"
                            boxShadow="md"
                            borderRadius="lg"
                            w="150px"
                        >
                            <Icon as={FaRegSmile} boxSize={8} color="yellow.400" />
                            <Text fontSize="2xl" fontWeight="bold">Easy</Text>
                            <Text fontSize="sm" color="gray.500">User Experience</Text>
                        </VStack>
                    </HStack>
                </MotionBox>

                {/* Scroll Down Indicator */}
                <MotionBox
                    position="absolute"
                    bottom="5"
                    left="50%"
                    transform="translateX(-50%)"
                    cursor="pointer"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ChevronDownIcon boxSize={8} color="gray.500" />
                    <Text fontSize="sm" color="gray.500">Scroll Down</Text>
                </MotionBox>
            </VStack>
        </Box>
    );
}
