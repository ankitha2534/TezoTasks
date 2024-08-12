using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DomainModelLayer.Models;

public partial class ToDoListDbContext : DbContext
{
    public ToDoListDbContext()
    {
    }

    public ToDoListDbContext(DbContextOptions<ToDoListDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    public virtual DbSet<UserTask> UserTasks { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=ToDoListDB;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserDeta__1788CC4C14C97D7C");

            entity.HasIndex(e => e.UserName, "UQ__UserDeta__C9F284560696E998").IsUnique();

            entity.Property(e => e.Password)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserTask>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__UserTask__7C6949B1A735AA36");

            entity.Property(e => e.IsDone).HasDefaultValue(false);
            entity.Property(e => e.TaskDate).HasColumnType("datetime");
            entity.Property(e => e.TaskDescription)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.TaskTitle)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.UserTasks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__UserTasks__UserI__4E88ABD4");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
