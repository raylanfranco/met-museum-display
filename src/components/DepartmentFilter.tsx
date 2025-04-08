import { Department } from "../types";

interface DepartmentFilterProps {
  departments: Department[];
  selectedDept: number | null;
  setSelectedDept: (id: number | null) => void;
  resetPage: () => void;
}

export default function DepartmentFilter({
  departments,
  selectedDept,
  setSelectedDept,
  resetPage,
}: DepartmentFilterProps) {
  return (
    <div className="text-right mb-6">
      <label htmlFor="department" className="block mb-2 font-medium">
        Filter by Department
      </label>
      <select
        id="department"
        value={selectedDept ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          setSelectedDept(val ? Number(val) : null);
          resetPage();
        }}
        className="w-full sm:w-72 border border-gray-300 rounded px-4 py-2"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept.departmentId} value={dept.departmentId}>
            {dept.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}
