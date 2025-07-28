
interface GroupModalProps {
    show: boolean;
    onClose: () => void;
    onCreate: () => void;
    newName: string;
    setNewName: (name: string) => void;
    newDesc: string;
    setNewDesc: (desc: string) => void;
}

const CreateGroupModal: React.FC<GroupModalProps> = ({
    show,
    onClose,
    onCreate,
    newName,
    setNewName,
    newDesc,
    setNewDesc,
}) => {
    if(!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}>
            <div
                className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                    Create New Group
                </h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
                    <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                <div>
                    <label
                    htmlFor="group-name"
                    className="block mb-1 text-sm font-medium text-gray-700"
                    >
                    Group Name
                    </label>
                    <input
                    id="group-name"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter a name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label
                    htmlFor="group-desc"
                    className="block mb-1 text-sm font-medium text-gray-700"
                    >
                    Description
                    </label>
                    <textarea
                    id="group-desc"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Enter a description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-2">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    onClick={onCreate}
                    disabled={!newName.trim()}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Create
                </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;