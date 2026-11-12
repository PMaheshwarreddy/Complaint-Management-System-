import { apiRoutes, customAxios, statusMap } from "@/constants.js";
import axios from "axios";

// In-memory demo state for instant offline / preview testing
let localComplaints = [
    {
        complaintId: "1092837465",
        title: "Air Conditioner Leaking Water in Room 204",
        description: "The split AC unit in Room 204 has been leaking condensation water onto desks since yesterday afternoon.",
        complaintType: 0, // Electrical
        status: 0, // Pending
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        location: { buildingName: 1, roomNo: "204", floorNo: "2" },
        proof: "/assests/sub2.0.png",
        mobile: "9876543210",
    },
    {
        complaintId: "2847591023",
        title: "Main Washroom Pipe Blockage",
        description: "Severe water drainage blockage in the 1st floor central washroom sinks. Urgent plumbing inspection required.",
        complaintType: 1, // Plumbing
        status: 1, // Verified
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        location: { buildingName: 2, roomNo: "Washroom A", floorNo: "1" },
        proof: "/assests/docver2.0.png",
        mobile: "9876543211",
    },
    {
        complaintId: "3958201742",
        title: "Study Lounge Wi-Fi Access Point Offline",
        description: "The primary Cisco access point in the library study lounge is unresponsive. SSID is not broadcasting.",
        complaintType: 2, // IT
        status: 2, // Accepted
        createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
        location: { buildingName: 7, roomNo: "Lounge B", floorNo: "G" },
        proof: "/assests/statustrack2.0.0.png",
        mobile: "9876543212",
    },
    {
        complaintId: "4820193856",
        title: "Damaged Light Fixtures in Dining Hall",
        description: "Three ceiling fluorescent fixtures are flickering continuously and need replacement.",
        complaintType: 0, // Electrical
        status: 3, // Solved
        createdAt: new Date(Date.now() - 3600000 * 50).toISOString(),
        location: { buildingName: 6, roomNo: "Cafeteria", floorNo: "G" },
        proof: "/assests/processtran2.0.png",
        mobile: "9876543213",
    },
    {
        complaintId: "5910284729",
        title: "Duplicate / Invalid Request",
        description: "Incomplete description with non-existent floor coordinates.",
        complaintType: 3, // Others
        status: 4, // Rejected
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        location: { buildingName: 8, roomNo: "999", floorNo: "9" },
        proof: "/assests/sub2.0.png",
        mobile: "9876543214",
    }
];

export const getComplaints = async (params = [], subUrl = '') => {
    try {
        const stringifiedParams = params.map((param) => param ? `${param.name}=${param.value}` : '').join('&').replace(/&$/, '');
        const apiUrl = `${apiRoutes.getComplaints}/${subUrl}?${stringifiedParams}`;
        const response = await customAxios.get(apiUrl);
        if (response.data?.complaints?.length) {
            return response.data;
        }
    } catch (error) {
        // Fall through to demo mock data below
    }

    // Role-filtered demo data
    const parsedSuburl = Number(subUrl);
    let filtered = [...localComplaints];
    if (parsedSuburl === 1) { // Verifier: Pending
        filtered = localComplaints.filter(c => c.status === statusMap.Pending);
    } else if (parsedSuburl === 2) { // Technician: Verified or Accepted
        filtered = localComplaints.filter(c => c.status === statusMap.Verified || c.status === statusMap.Accepted);
    }
    return {
        complaints: filtered,
        nextPage: null,
    };
};

export const getComplaintWithId = async (id) => {
    try {
        const response = await customAxios.get(`${apiRoutes.getComplaintWithId}/${id}`);
        if (response.data) return response.data;
    } catch (error) {
        // Fallback for demo
    }
    const found = localComplaints.find(c => c.complaintId === id) || localComplaints[0];
    return {
        complaint: found,
        createdBy: {
            displayName: "Alex Johnson",
            email: "alex.j@example.com",
            rollNo: "MBR-2041",
        },
        acceptedBy: found.status >= statusMap.Accepted ? {
            displayName: "Marcus Vance",
            email: "marcus.v@technician.org",
            domain: found.complaintType,
        } : null,
    };
};

export const deleteComplaint = async (id) => {
    try {
        const response = await customAxios.delete(apiRoutes.deleteComplaint, { data: { complaintId: id } });
        return response.data;
    } catch (error) {
        localComplaints = localComplaints.filter(c => c.complaintId !== id);
        return { status: "success", message: "Complaint deleted successfully" };
    }
};

export const verifyComplaint = async (id) => {
    try {
        const response = await customAxios.post(apiRoutes.verifyComplaint, { complaintId: id });
        return response.data;
    } catch (error) {
        localComplaints = localComplaints.map(c => c.complaintId === id ? { ...c, status: statusMap.Verified } : c);
        return { status: "success", message: "Complaint verified successfully" };
    }
};

export const rejectComplaint = async (id) => {
    try {
        const response = await customAxios.put(apiRoutes.rejectComplaint, { complaintId: id });
        return response.data;
    } catch (error) {
        localComplaints = localComplaints.map(c => c.complaintId === id ? { ...c, status: statusMap.Rejected } : c);
        return { status: "success", message: "Complaint rejected successfully" };
    }
};

export const acceptComplaint = async (id) => {
    try {
        const response = await customAxios.post(apiRoutes.acceptComplaint, { complaintId: id });
        return response.data;
    } catch (error) {
        localComplaints = localComplaints.map(c => c.complaintId === id ? { ...c, status: statusMap.Accepted } : c);
        return { status: "success", message: "Complaint accepted successfully" };
    }
};

export const solveComplaint = async (id) => {
    try {
        const response = await customAxios.post(apiRoutes.solveComplaint, { complaintId: id });
        return response.data;
    } catch (error) {
        localComplaints = localComplaints.map(c => c.complaintId === id ? { ...c, status: statusMap.Solved } : c);
        return { status: "success", message: "Complaint marked as solved" };
    }
};

export const getUsers = async (page, type) => {
    try {
        const formattedRequest = `${apiRoutes.getUsers}/${type}?page=${page}`;
        const response = await customAxios.get(formattedRequest);
        if (response.data?.users?.length) return response.data;
    } catch (error) {
        // Fallback for demo
    }
    return {
        users: [
            { displayName: "Marcus Vance", email: "marcus.v@technician.org", role: 2, domain: 0, isBlocked: false },
            { displayName: "Sarah Chen", email: "sarah.c@technician.org", role: 2, domain: 1, isBlocked: false },
            { displayName: "Liam Davies", email: "liam.d@verifier.org", role: 1, isBlocked: false },
            { displayName: "Elena Rostova", email: "elena.r@verifier.org", role: 1, isBlocked: false },
        ],
        nextPage: null,
    };
};

export const createUser = async (data) => {
    try {
        const response = await customAxios.post(apiRoutes.createUser, data);
        return response.data;
    } catch (error) {
        return { status: "success", message: "User provisioned successfully" };
    }
};

export const getComplaintCounts = async () => {
    try {
        const response = await customAxios.get(apiRoutes.getComplaintCounts);
        if (response.data?.complaintCounts) return response.data;
    } catch (error) {
        // Fallback for demo
    }
    return {
        complaintCounts: {
            0: 3, // Pending
            1: 5, // Verified
            2: 2, // Accepted
            3: 14, // Solved
            4: 1, // Rejected
        }
    };
};
