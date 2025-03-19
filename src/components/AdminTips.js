import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { createOrUpdateTip, deleteTip } from "@/services";
import { API_BASE_URL } from '@/utils/general';

const AdminTips = () => {
    const [tips, setTips] = useState([]);
    const [newTip, setNewTip] = useState({ text: "", category: "general" });
    const [editingTip, setEditingTip] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTips();
    }, []);

    // Fetch all tips
    const fetchTips = async () => {
        const res = await fetch(`${API_BASE_URL}/tips`);
        const data = await res.json();
        setTips(data);
    };

    // Handle Create or Update
    const handleSave = async () => {
        const method = editingTip ? "PUT" : "POST";
        const url = editingTip ? `${API_BASE_URL}/tips/${editingTip._id}` : `${API_BASE_URL}/tips`;

        await createOrUpdateTip(url, method, newTip);

        setShowModal(false);
        setNewTip({ text: "", category: "general" });
        setEditingTip(null);
        fetchTips();
    };

    // Handle Delete
    const handleDelete = async (id) => {
        await deleteTip(id);
        fetchTips();
    };

    return (
        <div className="p-4">
            <h2>Eco-Friendly Tips Management</h2>
            <Button onClick={() => { setEditingTip(null); setNewTip({ text: "", category: "general" }); setShowModal(true) }}>+ Add Tip</Button>

            {/* Tips Table */}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Tip</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tips.map((tip) => (
                        <tr key={tip._id}>
                            <td>{tip.text}</td>
                            <td>{tip.category}</td>
                            <td>
                                <Button variant="warning" onClick={() => { setEditingTip(tip); setNewTip(tip); setShowModal(true); }}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(tip._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding/Editing Tips */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingTip ? "Edit Tip" : "Add Tip"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tip Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTip.text}
                                onChange={(e) => setNewTip({ ...newTip, text: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={newTip.category} onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}>
                                <option value="general">General</option>
                                <option value="eco-stay">Eco-Stay</option>
                                <option value="outdoor">Outdoor</option>
                                <option value="cultural">Cultural</option>
                            </Form.Select>
                        </Form.Group>
                        <Button className="mt-3" onClick={handleSave}>{editingTip ? "Update" : "Create"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminTips;
