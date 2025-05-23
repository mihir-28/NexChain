import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as productService from '../../services/productService';
import * as web3Service from '../../services/web3Service';
import { FaCheck, FaTimes, FaExternalLinkAlt, FaQrcode } from 'react-icons/fa';
import { QRCodeSVG as QRCode } from 'qrcode.react';

const ProductVerification = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const verifyProduct = async () => {
      setLoading(true);
      try {
        const productData = await productService.getProduct(productId);

        // Fix verification inconsistencies
        if (productData.blockchainDataAvailable && productData.onChain) {
          // Use the helper or manually verify
          const { isVerified, verificationSource } = productService.verifyProductData(productData);
          productData.isVerified = isVerified;
          productData.verificationSource = verificationSource;
        } else {
          // Default to database verification if blockchain data isn't available
          productData.isVerified = true;
          productData.verificationSource = 'database';
        }

        setProduct(productData);
      } catch (err) {
        console.error('Error verifying product:', err);
        setError('Failed to verify product');
      } finally {
        setLoading(false);
      }
    };

    verifyProduct();
  }, [productId]);

  // Generate product verification URL for QR code
  const getProductVerificationUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/verify/${productId}`;
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      await web3Service.initWeb3();
      // Refresh the product data after connecting
      window.location.reload();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-8 bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cta"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-8 bg-background">
        <div className="bg-red-500/20 text-red-500 p-6 rounded-lg max-w-md w-full text-center">
          <FaTimes className="text-3xl mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Verification Failed</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center p-8 bg-background">
        <div className="bg-red-500/20 text-red-500 p-6 rounded-lg max-w-md w-full text-center">
          <FaTimes className="text-3xl mx-auto mb-4" />
          <h2 className="text-xl font-medium mb-2">Product Not Found</h2>
          <p>The product you are trying to verify could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-6 shadow-sm max-w-2xl w-full">
          <div className="flex flex-col items-center mb-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${product.isVerified
              ? 'bg-green-500/20 text-green-500'
              : 'bg-red-500/20 text-red-500'
              }`}>
              {product.isVerified
                ? <FaCheck className="text-3xl" />
                : <FaTimes className="text-3xl" />}
            </div>

            <h1 className="text-2xl font-bold text-center">
              {product.isVerified
                ? 'Product Verified'
                : 'Verification Failed'}
            </h1>

            <p className="text-text/70 text-center mt-2">
              {product.isVerified
                ? product.verificationSource === 'blockchain-full'
                  ? 'This product is authentic and ownership has been verified on the blockchain.'
                  : product.verificationSource === 'blockchain-exists'
                    ? 'This product exists on the blockchain, indicating it is authentic.'
                    : 'This product is in our database but blockchain verification is unavailable.'
                : 'This product could not be verified. It may be counterfeit or data may be corrupted.'}
            </p>

            {/* Display verification source badge */}
            <div className={`mt-3 px-4 py-1 rounded-full text-xs font-medium
              ${product.verificationSource.includes('blockchain')
                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
              {product.verificationSource === 'blockchain-full'
                ? 'Full Blockchain Verification'
                : product.verificationSource === 'blockchain-exists'
                  ? 'Product Verified On Blockchain'
                  : 'Database Verified'}
            </div>
          </div>

          <div className="border-t border-cta/20 pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-text/60 text-sm">Product Name</p>
                <p className="font-medium">{product.name}</p>
              </div>

              <div>
                <p className="text-text/60 text-sm">Manufacturer</p>
                <p className="font-medium">{product.manufacturer}</p>
              </div>

              <div>
                <p className="text-text/60 text-sm">Origin</p>
                <p className="font-medium">{product.origin}</p>
              </div>

              <div>
                <p className="text-text/60 text-sm">Serial Number</p>
                <p className="font-medium font-mono">{product.serialNumber}</p>
              </div>

              <div>
                <p className="text-text/60 text-sm">Status</p>
                <p className="font-medium">{product.status}</p>
              </div>

              <div>
                <p className="text-text/60 text-sm">Created On</p>
                <p className="font-medium">
                  {product.blockchainDataAvailable
                    ? new Date(Number(product.onChain.createTime) * 1000).toLocaleString()
                    : 'Blockchain data unavailable'}
                </p>
              </div>
            </div>

            {!product.blockchainDataAvailable && (
              <div className="mt-4 flex flex-col gap-3">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-sm rounded-lg">
                  <p>Blockchain verification data is currently unavailable.</p>
                </div>
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="px-4 py-2 bg-cta/20 hover:bg-cta/30 text-cta rounded-lg flex items-center justify-center"
                >
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connecting...
                    </>
                  ) : (
                    'Connect Wallet for Full Verification'
                  )}
                </button>
              </div>
            )}

            {product.blockchainDataAvailable && process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => {
                  const { isVerified, verificationSource } = productService.verifyProductData(product);
                  setProduct({
                    ...product,
                    isVerified,
                    verificationSource
                  });
                }}
                className="mt-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 rounded-lg flex items-center justify-center"
              >
                Re-verify Product
              </button>
            )}

            {/* Add this button for debugging */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => {
                  // Extract both the chain and db data for comparison
                  const blockchainData = product.onChain;
                  const dbData = {
                    name: product.name,
                    manufacturer: product.manufacturer,
                    serialNumber: product.serialNumber,
                    ownerAddress: product.ownerAddress || '',
                    // Other fields
                  };

                  // Check existence
                  const existsOnChain = !!blockchainData && !!blockchainData.dataHash;

                  // Check ownership
                  const chainOwner = blockchainData ? blockchainData.owner.toLowerCase() : 'none';
                  const dbOwner = product.ownerAddress ? product.ownerAddress.toLowerCase() : 'none';

                  alert(`VERIFICATION STATUS:
                  
Product exists on chain: ${existsOnChain ? 'YES' : 'NO'}
Blockchain owner: ${chainOwner}
Database owner: ${dbOwner}
Owners match: ${chainOwner === dbOwner ? 'YES' : 'NO'}

Verification Source: ${product.verificationSource}
Is Verified: ${product.isVerified ? 'YES' : 'NO'}`);
                }}
                className="mt-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-500 rounded-lg flex items-center justify-center"
              >
                Debug Verification
              </button>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowQRModal(true)}
              className="flex items-center gap-2 text-cta hover:text-cta/80"
            >
              <FaQrcode /> Share QR Code
            </button>

            <Link
              to={`/dashboard/products/${productId}`}
              className="flex items-center gap-2 text-cta hover:text-cta/80"
            >
              View Full Details <FaExternalLinkAlt className="text-sm" />
            </Link>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-panel max-w-md w-full rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Product QR Code</h3>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
              <QRCode
                value={getProductVerificationUrl()}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="mt-4 text-center text-sm text-text/70">
              Scan this QR code to verify product authenticity
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowQRModal(false)}
                className="px-4 py-2 bg-panel/50 hover:bg-panel/70 text-text/80 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Debug Section */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-gray-900 text-gray-200 rounded-lg font-mono text-xs">
          <h3 className="text-sm font-bold mb-2">Debug Info:</h3>
          <div className="grid grid-cols-2 gap-y-1">
            <span>Product ID:</span>
            <span>{productId}</span>
            <span>Blockchain ID:</span>
            <span>{product.blockchainId || 'N/A'}</span>
            <span>Verification Source:</span>
            <span>{product.verificationSource || 'unknown'}</span>
            <span>Is Verified:</span>
            <span>{product.isVerified ? 'Yes' : 'No'}</span>
            <span>Blockchain Data:</span>
            <span>{product.blockchainDataAvailable ? 'Available' : 'Unavailable'}</span>
            {product.onChain && (
              <>
                <span>Data Hash:</span>
                <span className="break-all">{product.onChain.dataHash}</span>

                <span>Product Fields:</span>
                <span className="break-all">
                  {JSON.stringify({
                    name: product.name,
                    serialNumber: product.serialNumber,
                    manufacturer: product.manufacturer,
                    origin: product.origin
                  })}
                </span>

                <span>Calculated Hash:</span>
                <span className="break-all">
                  {(() => {
                    try {
                      return productService.createDataHash(product);
                    } catch (err) {
                      return 'Error calculating hash';
                    }
                  })()}
                </span>
              </>
            )}
            <span>Data Last Updated:</span>
            <span>{product.updatedAt || product.registrationDate || 'unknown'}</span>
            <span>Hash Last Updated:</span>
            <span>{product.hashLastUpdated || product.registrationDate || 'unknown'}</span>
            <span>Verification Type:</span>
            <span>{product.verificationSource || 'unknown'}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductVerification;