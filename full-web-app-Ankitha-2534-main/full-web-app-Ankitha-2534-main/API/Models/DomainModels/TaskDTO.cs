using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModelLayer.DomainModels
{
    public class TaskDTO
    {
        public int UserId { get; set; }
        //public int TaskId { get; set; }
        public string TaskTitle { get; set; }
        public string TaskDescription { get; set; }
    }
}
