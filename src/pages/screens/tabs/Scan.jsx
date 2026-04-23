import React, { useRef, useEffect, useState } from 'react'
import { ANIMATION } from '../../../constants/animation'
import { COLORS } from '../../../constants/color'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft02Icon, Camera01Icon, Download01Icon } from 'hugeicons-react'
import { toast } from 'react-toastify'
import Tesseract from 'tesseract.js'
import jsPDF from 'jspdf'

function Scan() {
    const navigate = useNavigate()
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const streamRef = useRef(null)
    const scanIntervalRef = useRef(null)

    const [isCameraActive, setIsCameraActive] = useState(false)
    const [isScanning, setIsScanning] = useState(false)
    const [extractedText, setExtractedText] = useState('')
    const [capturedImage, setCapturedImage] = useState(null)
    const [analysisResult, setAnalysisResult] = useState(null)
    const [ocrProgress, setOcrProgress] = useState(0)

    // 📷 INITIALISER LA CAMÉRA
    useEffect(() => {
        startCamera()
        return () => {
            stopCamera()
        }
    }, [])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // caméra arrière mobile
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                }
            })

            if (videoRef.current) {
                videoRef.current.srcObject = stream
                streamRef.current = stream
                setIsCameraActive(true)
                toast.success('📷 Caméra activée', { autoClose: 2000 })

                // Démarrer le scan automatique après 1s
                setTimeout(() => {
                    startAutoScan()
                }, 1000)
            }
        } catch (error) {
            console.error('Erreur caméra:', error)
            toast.error('❌ Impossible d\'accéder à la caméra', { autoClose: 3000 })
        }
    }

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
        }
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current)
        }
        setIsCameraActive(false)
    }

    // 🤖 SCAN AUTOMATIQUE TOUTES LES 3 SECONDES
    const startAutoScan = () => {
        scanIntervalRef.current = setInterval(() => {
            captureAndAnalyze()
        }, 3000) // scan toutes les 3 secondes
    }

    // 📸 CAPTURE + OCR + ANALYSE IA
    const captureAndAnalyze = async () => {
        if (!videoRef.current || isScanning) return

        setIsScanning(true)
        toast.info('🔍 Scan en cours...', { autoClose: 1500 })

        const canvas = canvasRef.current
        const video = videoRef.current
        const context = canvas.getContext('2d')

        // Capturer l'image
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.95)
        setCapturedImage(imageDataUrl)

        // 🧠 OCR AVEC TESSERACT.JS
        try {
            const { data: { text } } = await Tesseract.recognize(
                imageDataUrl,
                'fra', // langue française
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setOcrProgress(Math.round(m.progress * 100))
                        }
                    }
                }
            )

            setExtractedText(text)
            toast.success('✅ Texte extrait avec succès', { autoClose: 2000 })

            // 🤖 ANALYSE IA DU TEXTE
            if (text.trim().length > 10) {
                await analyzeTextWithAI(text, imageDataUrl)
            } else {
                setIsScanning(false)
                toast.warning('📄 Texte trop court pour analyse', { autoClose: 2000 })
            }

        } catch (error) {
            console.error('Erreur OCR:', error)
            toast.error('❌ Erreur lors de l\'extraction', { autoClose: 2000 })
            setIsScanning(false)
        }
    }

    // 🤖 ANALYSE IA (MOCK OU API BACKEND)
    const analyzeTextWithAI = async (text, image) => {
        try {
            // MOCK ANALYSE IA (remplacer par vraie API)
            await new Promise(resolve => setTimeout(resolve, 1500))

            const analysis = {
                type: detectDocumentType(text),
                summary: generateSummary(text),
                keyInfo: extractKeyInfo(text),
                wordCount: text.split(/\s+/).length,
                confidence: 0.87
            }

            setAnalysisResult(analysis)
            toast.success('🧠 Analyse IA terminée', { autoClose: 2000 })

            // Arrêter le scan auto et naviguer
            if (scanIntervalRef.current) {
                clearInterval(scanIntervalRef.current)
            }

            // Navigation après 2s
            setTimeout(() => {
                navigate('/clonea/stack/analysis', {
                    state: {
                        image: image,
                        text: text,
                        analysis: analysis
                    }
                })
            }, 2000)

        } catch (error) {
            console.error('Erreur analyse IA:', error)
            toast.error('❌ Erreur analyse IA', { autoClose: 2000 })
        } finally {
            setIsScanning(false)
        }
    }

    // 🧠 DÉTECTION TYPE DE DOCUMENT
    const detectDocumentType = (text) => {
        const lowerText = text.toLowerCase()
        if (lowerText.includes('facture') || lowerText.includes('invoice')) return 'Facture'
        if (lowerText.includes('contrat') || lowerText.includes('contract')) return 'Contrat'
        if (lowerText.includes('carte') || lowerText.includes('identité')) return 'Carte d\'identité'
        if (lowerText.includes('reçu') || lowerText.includes('receipt')) return 'Reçu'
        return 'Document général'
    }

    // 📝 GÉNÉRATION RÉSUMÉ
    const generateSummary = (text) => {
        const words = text.split(/\s+/)
        return words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '')
    }

    // 🔍 EXTRACTION INFOS CLÉS
    const extractKeyInfo = (text) => {
        const info = []
        
        // Dates
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{2,4}/g
        const dates = text.match(dateRegex)
        if (dates) info.push({ label: 'Dates', values: dates.slice(0, 3) })

        // Montants
        const amountRegex = /\d+[.,]\d{2}\s*(?:€|FCFA|USD|EUR)/g
        const amounts = text.match(amountRegex)
        if (amounts) info.push({ label: 'Montants', values: amounts.slice(0, 3) })

        // Emails
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
        const emails = text.match(emailRegex)
        if (emails) info.push({ label: 'Emails', values: emails.slice(0, 2) })

        return info
    }

    // 📤 EXPORT PDF
    const exportToPDF = () => {
        if (!capturedImage || !extractedText) {
            toast.warning('⚠️ Aucune donnée à exporter', { autoClose: 2000 })
            return
        }

        try {
            const pdf = new jsPDF()
            
            // Ajouter l'image
            pdf.addImage(capturedImage, 'JPEG', 10, 10, 190, 140)
            
            // Ajouter le texte
            pdf.setFontSize(10)
            pdf.text('Texte extrait:', 10, 160)
            const splitText = pdf.splitTextToSize(extractedText, 180)
            pdf.text(splitText, 10, 170)

            // Télécharger
            pdf.save(`scan-${Date.now()}.pdf`)
            toast.success('📄 PDF téléchargé', { autoClose: 2000 })
        } catch (error) {
            console.error('Erreur export PDF:', error)
            toast.error('❌ Erreur export PDF', { autoClose: 2000 })
        }
    }

    // 🔴 CAPTURE MANUELLE (FALLBACK)
    const manualCapture = () => {
        if (scanIntervalRef.current) {
            clearInterval(scanIntervalRef.current)
        }
        captureAndAnalyze()
    }

    return (
        <div style={{ backgroundColor: '#000' }} className='w-full h-screen relative overflow-hidden'>
            {/* 📷 VIDÉO PLEIN ÉCRAN */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className='absolute inset-0 w-full h-full object-cover'
            />

            {/* CANVAS CACHÉ POUR CAPTURE */}
            <canvas ref={canvasRef} className='hidden' />

            {/* 🟦 OVERLAY SCAN FRAME */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                {/* Zone transparente autour du cadre */}
                <div className='absolute inset-0' style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 70%)'
                }} />

                {/* Cadre de détection */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='relative z-10'
                    style={{
                        width: '85%',
                        maxWidth: '400px',
                        aspectRatio: '3/4',
                        border: `3px solid ${COLORS.PURPLE}`,
                        borderRadius: '16px',
                        boxShadow: `0 0 30px ${COLORS.PURPLE}40`
                    }}
                >
                    {/* Coins du cadre */}
                    {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                        <div
                            key={corner}
                            className='absolute'
                            style={{
                                width: '30px',
                                height: '30px',
                                borderColor: COLORS.PURPLE,
                                ...(corner === 'top-left' && { top: '-3px', left: '-3px', borderTop: `6px solid`, borderLeft: `6px solid` }),
                                ...(corner === 'top-right' && { top: '-3px', right: '-3px', borderTop: `6px solid`, borderRight: `6px solid` }),
                                ...(corner === 'bottom-left' && { bottom: '-3px', left: '-3px', borderBottom: `6px solid`, borderLeft: `6px solid` }),
                                ...(corner === 'bottom-right' && { bottom: '-3px', right: '-3px', borderBottom: `6px solid`, borderRight: `6px solid` }),
                            }}
                        />
                    ))}

                    {/* 🔴 ANIMATION LASER SCAN */}
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div
                                initial={{ top: 0 }}
                                animate={{ top: '100%' }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                                className='absolute left-0 right-0'
                                style={{
                                    height: '3px',
                                    background: `linear-gradient(90deg, transparent, ${COLORS.PURPLE}, transparent)`,
                                    boxShadow: `0 0 10px ${COLORS.PURPLE}`
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Progression OCR */}
                    {isScanning && ocrProgress > 0 && (
                        <div className='absolute bottom-4 left-4 right-4 pointer-events-none'>
                            <div className='bg-black bg-opacity-70 rounded-lg p-3'>
                                <div className='text-white text-xs mb-2'>Analyse en cours... {ocrProgress}%</div>
                                <div className='w-full bg-gray-700 rounded-full h-2'>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${ocrProgress}%` }}
                                        className='h-2 rounded-full'
                                        style={{ backgroundColor: COLORS.PURPLE }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* 🎯 HEADER NAVIGATION */}
            <motion.div
                variants={ANIMATION.item}
                initial="hidden"
                animate="visible"
                className='absolute top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center'
                style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)'
                }}
            >
                <button
                    onClick={() => {
                        stopCamera()
                        navigate(-1)
                    }}
                    className='flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-4 py-2'
                >
                    <ArrowLeft02Icon stroke={3} size={24} color={COLORS.WHITE} />
                </button>

                <div className='flex items-center gap-3'>
                    {/* Indicateur caméra active */}
                    {isCameraActive && (
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className='flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-3 py-2'
                        >
                            <div className='w-2 h-2 rounded-full' style={{ backgroundColor: '#00ff00' }} />
                            <span className='text-white text-xs font-medium'>LIVE</span>
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* 🎮 CONTRÔLES BAS */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='absolute bottom-8 left-0 right-0 z-50 px-4 flex justify-center items-center gap-4'
            >
                {/* Bouton capture manuelle */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={manualCapture}
                    disabled={isScanning}
                    className='bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-5'
                    style={{
                        border: `3px solid ${COLORS.WHITE}`,
                        opacity: isScanning ? 0.5 : 1
                    }}
                >
                    <Camera01Icon size={32} color={COLORS.WHITE} />
                </motion.button>

                {/* Bouton export PDF */}
                {capturedImage && extractedText && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={exportToPDF}
                        className='bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-4'
                        style={{ border: `2px solid ${COLORS.WHITE}` }}
                    >
                        <Download01Icon size={24} color={COLORS.WHITE} />
                    </motion.button>
                )}
            </motion.div>

            {/* 📊 MINI PREVIEW RÉSULTAT */}
            <AnimatePresence>
                {extractedText && !isScanning && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className='absolute left-4 top-24 z-40 bg-black bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 max-w-xs'
                    >
                        <div className='text-white text-xs font-bold mb-2'>Texte détecté:</div>
                        <div className='text-gray-300 text-xs line-clamp-3'>
                            {extractedText.substring(0, 150)}...
                        </div>
                        {analysisResult && (
                            <div className='mt-2 pt-2 border-t border-gray-600'>
                                <div className='text-purple-400 text-xs font-medium'>
                                    Type: {analysisResult.type}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Scan