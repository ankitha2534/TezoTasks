namespace Concerns
{
    public class Role
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleDepartment { get; set; }
        public string? RoleDescription { get; set; }
        public string RoleLocation { get; set; }
        public Role(string RoleName, string RoleDepartment, string RoleLocation)
        {
            this.RoleName = RoleName;
            this.RoleDepartment = RoleDepartment;
            this.RoleLocation = RoleLocation;
        }
    }
}
