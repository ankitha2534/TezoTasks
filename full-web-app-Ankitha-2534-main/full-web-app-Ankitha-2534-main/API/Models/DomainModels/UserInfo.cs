﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModelLayer.DomainModels
{
    public class UserInfo
    {
        public int UserId { get; set; }

        public string? UserName { get; set; }

        public string? Password { get; set; }
    }
}
