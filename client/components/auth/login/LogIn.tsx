"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../src/firebaseConfig";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false);
                toast({
                    title: "Login successful.",
                    description: "Redirecting to dashboard...",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            })
            .catch((error) => {
                setLoading(false);
                let message = error.message;

                toast({
                    title: "Login failed.",
                    description: message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            });
    }

    return (
        <Box
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                w="full"
                maxW="400px"
                p={6}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="lg"
                bg={"var(--form-color)"}
                fontFamily={"var(--font-primary)"}
            >
                <Heading mb={4} fontSize="2xl" textAlign="center">
                    Login
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Text fontSize="sm" textAlign="right">
                            <Link href="/auth/forgotpassword" passHref>
                                <Button
                                    variant="link"
                                    colorScheme="teal"
                                    size="sm"
                                >
                                    Forgot Password?
                                </Button>
                            </Link>
                        </Text>
                        <Button
                            bg="var(--accent-color)"
                            type="submit"
                            width="full"
                            isLoading={loading}
                            loadingText="Logging in..."
                        >
                            Login
                        </Button>
                        <Text textAlign="center" mt={2}>
                            Don&apos;t have an account?{" "}
                            <Button variant="link" colorScheme="teal">
                                <Link href="/auth/signup">Sign Up</Link>
                            </Button>
                        </Text>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}
