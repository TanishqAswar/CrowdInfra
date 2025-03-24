'use client';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export default function ViewRequest() {
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [businessAnalysis, setBusinessAnalysis] = useState(null);
    const [businessLoading, setBusinessLoading] = useState(false);
    const searchParams = useSearchParams();
    const mapRef = useRef(null);
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    useEffect(() => {
        async function fetchRequest() {
            try {
                const requestId = searchParams.get('id');
                console.log(requestId);
                if (!requestId) {
                    throw new Error('Request ID not found in URL');
                }

                const response = await fetch(`http://localhost:5030/api/demand/getDemandById/${requestId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch request details');
                }

                const data = await response.json();
                setRequest(data);

                // After loading request, get business analysis
                if (data) {
                    getBusinessSuggestions(data);
                }
            } catch (err) {
                console.error('Error fetching request:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRequest();
    }, [searchParams]);

    useEffect(() => {
        // Initialize map when request data is loaded
        if (request && mapRef.current) {
            initMap();
        }
    }, [request]);

    function initMap() {
        if (typeof window !== 'undefined') {
            if (typeof window.google === 'undefined') {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.defer = true;
                script.onload = () => renderMap();
                document.head.appendChild(script);
            } else {
                renderMap();
            }
        }
    }
    
    function renderMap() {
        try {
            if (!mapRef.current || !window.google || !window.google.maps) {
                console.error("Google Maps API not loaded yet");
                return;
            }
            
            const mapOptions = {
                center: { 
                    lat: request.location.coordinates[1], 
                    lng: request.location.coordinates[0] 
                },
                zoom: 15,
                styles: [
                    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                ]
            };
            
            const map = new window.google.maps.Map(mapRef.current, mapOptions);
            
            // Use the modern approach for creating markers
            const marker = new window.google.maps.Marker({
                position: { 
                    lat: request.location.coordinates[1], 
                    lng: request.location.coordinates[0] 
                },
                map: map,
                title: request.title,
                animation: window.google.maps.Animation.DROP
            });
        } catch (error) {
            console.error("Error rendering map:", error);
        }
    }

    async function getBusinessSuggestions(requestData) {
        setBusinessLoading(true);
        try {
            const prompt = `
            Analyze this business request and provide suggestions:
            
            Title: ${requestData.title}
            Category: ${requestData.category}
            Description: ${requestData.description}
            Location: ${requestData.location.coordinates[1]}, ${requestData.location.coordinates[0]}
            
            Please provide a structured analysis with these sections:
            1. Competitive Analysis: What's the likely competition in this area?
            2. Market Potential: Is there good demand for this?
            3. Resource Requirements: What key resources would be needed?
            4. Success Factors: What would help this business succeed?
            
            Format your response using markdown.
            `;

            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: {
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                },
            });

            setBusinessAnalysis(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error("Error getting business analysis:", error);
            setBusinessAnalysis("Failed to generate business analysis. Please try again later.");
        } finally {
            setBusinessLoading(false);
        }
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    }

    const MarkdownComponents = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg overflow-x-auto"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code
                    className={`${className} bg-gray-800 text-blue-400 px-1 rounded`}
                    {...props}
                >
                    {children}
                </code>
            );
        },
        strong: ({ children }) => (
            <strong className="font-bold text-blue-400">{children}</strong>
        ),
        h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-blue-300 mb-4 border-b border-gray-700 pb-2">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-blue-400 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-lg font-medium text-blue-500 mb-2">{children}</h3>
        ),
        ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 pl-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 pl-4 space-y-1">{children}</ol>
        ),
        p: ({ children }) => (
            <p className="mb-3 leading-relaxed">{children}</p>
        ),
    };

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex justify-center items-center bg-black">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                <p className="text-red-400">{error}</p>
                <Link href="/" className="mt-6 inline-block text-blue-400 hover:text-blue-300 hover:underline">
                    Return to home
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-6">
                        <h1 className="text-3xl font-bold text-white mb-2">{request.title}</h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-900">
                                {request.category}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                {request.status.replace('_', ' ')}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-blue-400 mb-3">Description</h2>
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <p className="text-gray-100 whitespace-pre-wrap">{request.description}</p>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-blue-400 mb-3">Location</h2>
                                <div ref={mapRef} className="h-[300px] w-full rounded-lg overflow-hidden bg-gray-800"></div>
                                <p className="mt-2 text-gray-300 text-sm">
                                    Coordinates: {request.location.coordinates[1]}, {request.location.coordinates[0]}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-blue-400 mb-2">Community Engagement</h3>
                                    <div className="flex items-center space-x-6">
                                        <div className="flex flex-col items-center">
                                            <span className="text-2xl text-green-400 font-bold">👍 {request.up_votes}</span>
                                            <span className="text-sm text-gray-400">Upvotes</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-2xl text-red-400 font-bold">👎 {request.down_votes}</span>
                                            <span className="text-sm text-gray-400">Downvotes</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-blue-400 mb-2">Timeline</h3>
                                    <p className="text-gray-300"><span className="text-gray-500">Created:</span> {formatDate(request.createdAt)}</p>
                                    <p className="text-gray-300"><span className="text-gray-500">Last updated:</span> {formatDate(request.updatedAt)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-1">
                            <div className="bg-gray-800 rounded-lg p-4 h-full">
                                <h2 className="text-xl font-bold text-blue-400 mb-4">Business Analysis</h2>
                                
                                {businessLoading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-pulse flex flex-col items-center">
                                            <div className="rounded-full bg-gray-700 h-12 w-12 mb-2"></div>
                                            <div className="text-gray-500 text-sm">Generating analysis...</div>
                                        </div>
                                    </div>
                                ) : businessAnalysis ? (
                                    <div className="prose prose-invert max-w-none text-gray-300">
                                        <ReactMarkdown 
                                            components={MarkdownComponents}
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {businessAnalysis}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="text-gray-400 italic">Analysis not available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
                        <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            Back to all requests
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}