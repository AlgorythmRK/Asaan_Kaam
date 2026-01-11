import { useState, useEffect, useRef } from 'react'
import { CATEGORIES, UNITS } from '../data/mockInventory'
import API from '../utils/api'

const AddItemModal = ({ isOpen, onClose, onSave, editItem = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: CATEGORIES[0],
        quantity: '',
        unit: UNITS[0],
        reorderLevel: '',
        image: null
    })

    const [previewUrl, setPreviewUrl] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (editItem) {
            setFormData({
                name: editItem.name,
                category: editItem.category,
                quantity: editItem.quantity,
                unit: editItem.unit,
                reorderLevel: editItem.reorderLevel,
                image: editItem.image
            })
            setPreviewUrl(editItem.image)
            setImageFile(null)
        } else {
            setFormData({
                name: '',
                category: CATEGORIES[0],
                quantity: '',
                unit: UNITS[0],
                reorderLevel: '',
                image: null
            })
            setPreviewUrl(null)
            setImageFile(null)
        }
    }, [editItem, isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = (e) => {
        e.stopPropagation()
        setFormData(prev => ({ ...prev, image: null }))
        setPreviewUrl(null)
        setImageFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('category', formData.category);
            data.append('quantity', formData.quantity);
            data.append('unit', formData.unit);
            data.append('reorderLevel', formData.reorderLevel);

            if (imageFile) {
                data.append('image', imageFile);
            } else if (formData.image === null && editItem && editItem.image) {
                // If image was removed from an existing item
                data.append('image', 'REMOVE_IMAGE'); // Special flag for backend
            } else if (formData.image && !imageFile) {
                // If an existing image is kept and no new file is selected
                data.append('image', formData.image); // Send the existing URL
            }


            if (editItem) {
                await API.put(`/inventory/${editItem._id || editItem.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await API.post('/inventory', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            onSave() // This will trigger fetchInventory in the Dashboard
            onClose()
        } catch (error) {
            console.error('Error saving item:', error)
            alert(error.response?.data?.message || 'Failed to save item')
        } finally {
            setIsSaving(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className={`modal-overlay open ${editItem ? 'centered' : ''}`} onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-header-content">
                        <div className="modal-icon">
                            {editItem ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h2 className="modal-title">{editItem ? 'Edit Item' : 'Add New Item'}</h2>
                            <p className="modal-subtitle">
                                {editItem ? `Update details for ${editItem.name}` : 'Fill in the details to add a new inventory item'}
                            </p>
                        </div>
                    </div>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-body">
                    <div className="modal-form-group">
                        <label className="modal-form-label">Item Name <span>*</span></label>
                        <input
                            type="text"
                            name="name"
                            className="modal-form-input"
                            placeholder="e.g. Fresh Tomatoes"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="modal-form-row">
                        <div className="modal-form-group">
                            <label className="modal-form-label">Category <span>*</span></label>
                            <select
                                name="category"
                                className="modal-form-input modal-form-select"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-form-group">
                            <label className="modal-form-label">Unit <span>*</span></label>
                            <select
                                name="unit"
                                className="modal-form-input modal-form-select"
                                value={formData.unit}
                                onChange={handleChange}
                                required
                            >
                                {UNITS.map(u => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="modal-form-row">
                        <div className="modal-form-group">
                            <label className="modal-form-label">Current Quantity <span>*</span></label>
                            <input
                                type="number"
                                name="quantity"
                                step="any"
                                className="modal-form-input"
                                placeholder="0.00"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="modal-form-group">
                            <label className="modal-form-label">Reorder Level <span>*</span></label>
                            <input
                                type="number"
                                name="reorderLevel"
                                step="any"
                                className="modal-form-input"
                                placeholder="0.00"
                                value={formData.reorderLevel}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-form-group">
                        <label className="modal-form-label">Item Image (Mock Cloudinary)</label>
                        <div className="image-upload-wrapper">
                            {!previewUrl ? (
                                <div className="image-upload-area" onClick={() => fileInputRef.current?.click()}>
                                    <div className="image-upload-icon">📸</div>
                                    <p className="image-upload-text">Click to upload or drag and drop</p>
                                    <p className="image-upload-subtext">PNG, JPG, WEBP (Max 2MB)</p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="image-upload-input"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            ) : (
                                <div className="image-preview">
                                    <img src={previewUrl} alt="Preview" />
                                    <button type="button" className="image-preview-remove" onClick={handleRemoveImage}>✕</button>
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                <div className="modal-footer">
                    <button type="button" className="modal-btn modal-btn-cancel" onClick={onClose} disabled={isSaving}>
                        Cancel
                    </button>
                    <button type="submit" className="modal-btn modal-btn-submit" onClick={handleSubmit} disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <span className="spinner"></span>
                                Saving...
                            </>
                        ) : (
                            editItem ? 'Update Item' : 'Add Item'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddItemModal
